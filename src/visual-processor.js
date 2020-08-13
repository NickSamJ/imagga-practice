import $ from 'jquery'

function getLi(text){
    return( $(`<li class="collection-item"> ${text}</li>`))
}
const proxy = "https://stackoverflow.com/questions/27670401/using-jquery-this-with-es6-arrow-functions-lexical-this-binding/27670450"
function getColoredLi(rgb) {
    let li = $("<li>")
    const colors = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`
    checkColor(li, rgb[0], rgb[1], rgb[2])
    li.css("background", colors)
    li.text(colors)
    return li
}
function checkColor(li,  r, g, b){
    let hsp = Math.sqrt( // HSP equation from http://alienryderflex.com/hsp.html
        0.299 * (r * r) +
        0.587 * (g * g) +
        0.114 * (b * b)
    );
    if (hsp>127.5) {
        li.addClass('light');
    } else {
        li.addClass('dark');
    }
}
export default class VisualProcessor{
    constructor(tagsListSelector, colorsListSelector, imageSelector) {
        this.$tagsElement = $(tagsListSelector)
        this.$colorsElement = $(colorsListSelector)
        this.$thumbnailImage = $(imageSelector)
    }

    renderTags(tags){
        this.$tagsElement.empty()
        tags.forEach(tag => {
            this.$tagsElement.append(getLi(tag))
        })
    }

    renderColors(colors){
        this.$colorsElement.empty()
        Object.entries(colors).forEach(([key, value]) => {

            this.$colorsElement.append(getLi(key))
            value.forEach((color) => {
                this.$colorsElement.append(getColoredLi(color))
            })
        })
    }

    renderImage(url){

        this.$thumbnailImage.html(`<img src="${url}", alt="${url}"/>`)
    }

    cleanTables(){
        this.$tagsElement.empty()
        this.$colorsElement.empty()
        this.$thumbnailImage.empty()
    }
}

export function toggleFormsHandler(toglers, inputs){
    inputs = $(inputs)
    $(toglers).on("click", function(e) {
        inputs.hide()
        inputs.find('input').val("").removeAttr('required')
        const id = $(this).find('input').attr('data-target')

        const formWrapper = $(`#${id}`)
        formWrapper.find('input').attr('required', 'true')
        refreshSubmit($('form').find('button:submit'), formWrapper.find('input'))
        formWrapper.show()
    })
}

export function refreshSubmit(submitButton, inputSelector){

    if($(inputSelector).val().trim() ==""){
        $(submitButton).attr('disabled', 'true')
    }else {
        $(submitButton).attr('disabled', 'false')
    }
}

