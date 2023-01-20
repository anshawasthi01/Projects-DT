import { Router } from 'express';
import { tokenExtractor, tokenValidator, validateToken } from '../middleware';
import { User, Request, Header } from '../models';

const requestRouter = Router();

requestRouter.get('/', tokenExtractor,tokenValidator, async (req, res) => {
    try {
        const decodedToken = validateToken(req, res, next);
        if(res.headersSent) {
            return
        }

        const requests = await Request.findall({
            where: {
                UserId: decodedToken.id
            }
        });

        let reqs =requests.map(req => req.toJSON()).map(req => {
            req.headers = [];
            return req
        });

        for(const req in reqs){
            const headers = await Header.findAll({ehere: {RequestId: req.id}});
            req.headers = headers.map(header => header.toJSON())
        };

        res.status(200).json(reqs);

    }catch(e){
        return res.status(500).json({ error: e})
    }
});


requestRouter.get('/:id', async(req, res, next) => {
    try{
        const requestId = req.params.id;
        let foundRequest = await Request.findByPk(requestId);

        if(!foundRequest){
            return res.status(404).json({ error: "Not found"})
        }

        const savedHeaders = await Header.findAll({ where: {RequestId: requestId}});
        foundRequest  =foundRequest.toJSON();
        foundRequest.headers = savedHeaders.toJSON();
        return res.status(200).json(foundRequest)
    }catch(e){
        return res.status(500).json({ error: e})
    }
});

requestRouter.post("/:id", tokenExtractor, tokenValidator, async (req, res, next) => {
    try{
        const decodedToken = validateToken(req, res, next);
        const user = User.findByPk(decodedToken.id);
        if (!user){
            return res.status(404).json({error: "invalid user"});
        }

        const requestId = req.params.id;
        if(requestId =='0'){
            const newRequest = await Request.create({
                url: '',
                type: '',
                body: '',
                UserId: decodedToken.id
            });

            const savedReq = await newRequest.save();
            return res.status(201).json(savedReq);
        }

        let foundRequest = await Request.findById(requestId);

        if(!foundRequest){
            return req.status(404).json({ error: "req not found"})
        }

        let { url='', type='', body='', headers=[] } = req.body;
        foundRequest.url = url;
        foundRequest.type = type;
        foundRequest.body = body;

        let savedReq = await foundRequest.save();
        for(const header of headers){
            await Header.update({
                key: header.key || '',
                value: header.value ||'',
                checked: header.checked || false
            }, {
                where:{
                    id: header.id
                }
            })
        };

        savedReq = savedReq.toJSON();
        let savedHeaders = await Header.findAll({
            where:{
                RequestId: savedReq.id
            }
        });

        savedHeaders.headers = savedHeaders;
        return res.status(200).json(savedReq);

    }catch(e){
        return res.status(500).json({ error: e})
    }
});


requestRouter.delete('/:id/header/:headerId', tokenExtractor, tokenValidator, async(req, res, next) => {
    const decodedToken = validateToken(req, res, next);
    const user = User.findByPk(decodedToken.id);

    const headerId = req.params.headerId;
    const savedHeaders = await Header.findByPk(headerId);
    await savedHeaders.destroy();
    return res.status(204).end();
})






export default requestRouter;