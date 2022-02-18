
interface FormValidators{
    min?: number,
    max?: number,
    required? : boolean,
    requiredTrue? : boolean,
    email? : boolean,
    minLength? : boolean,
    maxLength? : boolean,
    pattern? : string,
    nullValidator?: boolean,
    sizeImage: sizeImage

}

interface sizeImage{

    max: number

}

interface FormControlOptions{
    min?: string,
    max?: string,
    step?: string,
    icon?: string
}

export interface FormControls{
    name : string,
    label : {
        english : string,
        spanish : string
    }
    value : string,
    type : string,
    options? : FormControlOptions,
    required : boolean,
    validators : FormValidators
}

export interface FormData{
    controls : FormControls[]
}