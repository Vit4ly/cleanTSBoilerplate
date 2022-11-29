export const isDev = process.env.NODE_ENV === 'development'
export const isProd = !isDev

export const filename = (ext, isProd) => {
    return isProd ? `static/${ext}/[name].[contanthash:8].${ext}`: `static/${ext}/[name].${ext}`
}

export const chunkFilename = (ext, isProd) => {
    return isProd
        ? `static/${ext}/[name].[contanthash:8].chunk.${ext}`
        :`static/${ext}/[name].[chunkhash].chunk.${ext}`
}
