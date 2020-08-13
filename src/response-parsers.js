export function tagsParser(data){
    return data.result.tags.reduce((res, current) => {
        res.push(Object.values(current.tag)[0])
        return res
    }, [])
}

function getValues(obj){
    return Object.values(obj).reduce((res, current) => {
        res.push([current.r, current.g, current.b])
        return res
    }, [])
}
export function colorsParser(data){
    return {
        background_colors: getValues(data.result.colors.background_colors),
        foreground_colors: getValues(data.result.colors.foreground_colors),
        image_colors: getValues(data.result.colors.image_colors),
    }
}