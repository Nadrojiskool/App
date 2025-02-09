import axios from "axios";
import { BasicError } from "src/types/error";
import { GetNFTUserProps } from "src/types/nft";
import { getSessionUser } from "../auth/[...nextauth]";
import { errorHandling } from "../validate";

const headers = { appsecret: String(process.env.ASSETLAYER_APP_SECRET) };

export default function getNFTsUserHandler(req:any, res:any) {
    return new Promise((resolve, reject) => {
        const handleError = (e:any) => errorHandling(e, resolve, res);

        try {
            const  { idOnly, countsOnly } = req.body;
            
            getSessionUser(req, res)
                .then((user) => getNFTsUser({ handle: user.handle, idOnly, countsOnly }))
                .then((body) => resolve(res.status(200).json(body)))
                .catch(handleError)
        } catch(e:any) {
            handleError(e);
        }
    })
}

export async function getNFTsUser(props:GetNFTUserProps) {
    const response = await axios.get('https://api.assetlayer.com/api/v1/nft/user', { 
        data: props, 
        headers },
    );

    return response.data.body;
}