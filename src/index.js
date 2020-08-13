import $ from 'jquery'
import 'materialize-css/sass/materialize.scss'
import 'materialize-css/dist/js/materialize.min';
import '../scss/styles.scss'
import LoadingIndicator from "./loadingIndicator";
import FormHandler from "./form-handler";
import ImaggaServer from "./imagga-server";
import {colorsParser, tagsParser} from "./response-parsers";
import VisualProcessor, {refreshSubmit, toggleFormsHandler} from "./visual-processor";

let imageUrl64 = ""
const preloader = new LoadingIndicator()
const server = new ImaggaServer()
const visualProcessor = new VisualProcessor(".tags-list", ".colors-list", "#image-holder", '#image-form-submit')
toggleFormsHandler('.form-toggler', ".image-source-input-wrapper")

const imageFormHandler = new FormHandler("#image-form")

preloader.start()

$(window).on('load', () => {
    setTimeout(() =>{
        preloader.stop()

    }, 500)
})



imageFormHandler.addHandler(async (imageData) => {
    preloader.start()

    try{
        if(imageData.activeForm == "casual"){
            await processImageByUrl(imageData)
        }else{
            await processImageByFile(imageData)

        }
    }catch (e) {
        alert(e)
    }finally {
        preloader.stop()
    }

})

async function processImageByUrl(imageData){
    const getTagsData = {
        url: imageData["image-url"],
        lang: imageData["image-language"],
        limit: 10
    }
    const getColorsData = {
        url: imageData["image-url"],
        limit: 10
    }

    // Requests execution in parallel
    await Promise.all([
        server.getTags(getTagsData),
        server.getColors(getColorsData)
    ]
    ).then(res => {
        visualProcessor.renderImage(imageData["image-url"])
        renderColorsTags(res[1], res[0])
    })
}

async function processImageByFile(imageData) {
    const uploadData = {
        photo: imageUrl64,
    }

    const id = await server.uploadPhoto(uploadData)

    const getTagsData = {
        url: id.result["upload_id"],
        page: "?image_upload_id=",
        // limit: 10
    }
    const getColorsData = {
        url: id.result["upload_id"],
        page: "?image_upload_id=",
        lang: imageData["image-language"],
    }

    // Requests execution in parallel
    await Promise.all([
            server.getTags(getTagsData),
            server.getColors(getColorsData)
    ]).then(res => {
        renderColorsTags(res[0], res[1])
        $('.form-toggler').first().click()  // refreshing form
    })
}

function renderColorsTags(colors, tags){
    let tagsArray = tagsParser(tags)
    visualProcessor.renderTags(tagsArray)

    let colorsArray = colorsParser(colors)
    visualProcessor.renderColors(colorsArray)
}

$('#file-input').on('change', (event, input) => {
    preloader.start()
    let  reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = async function (e ) {
        imageUrl64 = await e.target.result
        visualProcessor.renderImage(imageUrl64)
    }
    preloader.stop()
})
