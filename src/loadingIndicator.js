import  $ from 'jquery'

const loaderHTML = `<div class="progress loader-indicator">
                      <div class="indeterminate"></div>
                  </div>`
export default class LoadingIndicator{

    start(){
        $('body').append(loaderHTML)
    }
    stop(){
        $('.progress').remove()
    }
}