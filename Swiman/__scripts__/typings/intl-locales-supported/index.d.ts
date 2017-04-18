declare var areIntlLocalesSupported: (languages: string[]) => boolean

declare module "intl-locales-supported" {
    export = areIntlLocalesSupported
}