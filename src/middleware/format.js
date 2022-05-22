import o2x from "object-to-xml";
import yaml from "js-yaml";

export default function formatter(req, res, next) {
	console.log(req.headers["accept"]);

	switch (req.headers["accept"]) {
		case '*/*':
        case "application/json":
			req.format = jsonFormatter;
			break;
		case "application/xml":
			req.format = xmlFormatter;
			break;
		case "application/yaml":
		case "text/yaml":
			res.setHeader('Content-Type','text/yaml')
			req.format = yamlFormatter;
			break;
		default:
			req.format = jsonFormatter;
			break;
	}
	return next();
}

function jsonFormatter(data) {
	return data;
}

function xmlFormatter(data) {
	if(data instanceof Array){
	    return o2x({['group']: {['item']: data}})
	}
	return o2x({['item']: data})
}

function yamlFormatter(data) {
	return yaml.dump(data);
}
