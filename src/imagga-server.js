import $ from 'jquery'
import {testDataTags, testDataColors, uploadId} from "./test-data";

const authKey =  "Basic YWNjX2EwYTYzZDI1ODkyNzcwNDoxZDE3YWI0OWFlMzgxOGZiYjk2MDY4NDJlZGExN2QyNA=="
const endPoint = "https://api.imagga.com/v2/"
//https://api.imagga.com/v2/tags?image_url=http://vasus.com/myimage.jpeg&limit=10&language=ru

function getRequestUrl(type, data) {

    return endPoint + type + (data.page || "?image_url=")+ data.url + (data.limit ? "&limit="+data.limit : '') + (data.lang ? "&language="+data.lang : '')
}

function getTagsRequestUrl(data) {

    return getRequestUrl("tags", data);
}

function getColorsRequestUrl(data) {

    return getRequestUrl("colors", data);
}
function getPhotoUploadUrl(photo){
    return endPoint + "uploads"

}
function getUploadedPhotoTagsUrl(photoUploaded) {
    return endPoint + "tags?image_upload_id=" + photoUploaded
}
function getResponse(options){
    return(
      $.ajax(options.url, {
        type: options.type || 'GET',
        headers: {
            Authorization: authKey,
        },
        data: options.data || ""
    }).catch(error => {
        let message = ""
        if(error.readyState == 0) {
            message = "service is currently unavailable"
        }else{
            switch (error.status) {
                case 400 : message ="Bad Request – Something is wrong with the formatting of your request. Make sure you've provided all required parameters.";break;
                case 401: message = "Unauthorized – There is a problem with the request authorization. Make sure your authorization header is properly formatted with your api key and secret. Read more in the \"Authentication\" section.";break
                case 403: message =	"Forbidden – You have reached one of your subscription limits therefore you are temporarily not allowed to perform this type of request.";break
                case 404: message =	"Not Found – The endpoint does not exists or you've requested non-existing resource.";break
                case 405: message =	"Method Not Allowed – The HTTP method is not supported by the requested endpoint.";break
                case 406: message =	"Not Acceptable – You requested a format that isn’t json."
                case 410: message =	"Gone – The resource you've requested is not available anymore."
                case 429: message =	"Too Many Requests – You have reached the concurrency limit of your current subscription plan, just wait a second and retry the request.";break
                case 500: message =	"Internal Server Error – We had a problem with our server. Try again later or write us about this at api [at] imagga.com";break
                case 503: message =	"Service Unavailable – We’re temporarily offline for maintenance. Please try again later."

            }
        }
        throw new Error(message)
      })
    )
}

function getTestData(dataSource){
    return(
        new Promise((resolve) => setTimeout(
            () => {resolve(dataSource) },
            4000
        ))
    )
}

export default class ImaggaServer {

     getTags(data){
        return getResponse({url: getTagsRequestUrl(data)})
    }

     getColors(data){
        return getResponse({url: getColorsRequestUrl(data)})
    }

    uploadPhoto(data){
        const uploadData = {
            url: getPhotoUploadUrl(data.photo),
            type: "POST",
            data: {
                image_base64: data.photo
            }
        }
        return getResponse(uploadData)
    }

}