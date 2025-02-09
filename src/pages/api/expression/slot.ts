import axios from "axios";
import { BasicError } from "src/types/error";
import { GetExpressionSlotProps } from "src/types/expression";
import Expression from "src/types/expression";
import { getSessionUser } from "../auth/[...nextauth]";
import { errorHandling } from "../validate";

const headers = { appsecret: String(process.env.ASSETLAYER_APP_SECRET) };

export default function getExpressionsHandler(req:any, res:any) {
	return new Promise((resolve, reject) => {
		const handleError = (e:any) => errorHandling(e, resolve, res);

		try {
			const { slotId } = req.body;

			if (!slotId) throw new BasicError('missing slotId', 409);
			
			getExpressions(req.body)
				.then((body) => resolve(res.status(200).json(body)))
				.catch(handleError)
		} catch(e:any) {
			handleError(e);
		}
	})
}


export async function getExpressions(props:GetExpressionSlotProps) {
	const response = await axios.get('https://api.assetlayer.com/api/v1/expression/slot', { 
		data: props, 
		headers },
	);

	return response.data.body;
}