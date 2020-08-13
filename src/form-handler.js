import $ from 'jquery'
export default class FormHandler{
    constructor(selector, options) {
        this.$form = $(selector)
        this.additionalMethods = options
    }

    addHandler(dataFn) {

        this.$form.on( 'submit', async (event) => {
            this.$form.find('button[type="submit"]').attr('disabled', true)
            event.preventDefault();

            let dataObj = this.$form.serializeArray()
                .reduce(function (obj, current) {
                    obj[current.name] = current.value;
                    return obj;
                }, {})

            let message = await dataFn(dataObj);
            if(message && typeof(message) !== "object"){
                alert(message);
            }else {
                event.target.reset();
            }
            // this.$form.find('button[type="submit"]').attr('disabled', disabled)

        })

        // simple validation (if input "required": submit - disabled )
        let submitButton = this.$form.find('button[type="submit"]')
        this.$form.on('keyup change' , () => {
            submitButton.removeAttr('disabled')
            this.$form.find('input:required').each( (index, element) => {
                if($(element).val().length == 0){
                    submitButton.attr('disabled', 'disabled')
                }
            })
        })
    }
}
