import { groq } from 'next-sanity'

export const artistProjection = groq`{
    ...,
    bio[]{..., "asset": asset->},
    "imageMeta": image.asset->,
    "instruments": instruments[]->{title}
  }`

export const eventProjection = groq`{
    ...,
    "imageMeta": image.asset->,
  }`
export const queryProjection = groq`{...}`
export const programProjection = groq`{...}`
export const youtubeProjection = groq`{...}`
export const ctaProjection = groq`{
    _type,
    'title': cta.title,
    'page': cta.page->slug.current,
    'link': cta.link,
  }`

export const listProjection = groq`{
    ...,
    listItems[]->{
        ...,
        _type =="artist"=>${artistProjection},
        _type =="event"=>${eventProjection},
        _type =="program"=>${programProjection},
    },
}`

export const imageSectionProjection = groq`{
    ...,
    "imageMeta": image.asset->,
    'cta': ${ctaProjection}
}`

export const contentProjection = groq`{
    ...,
    _type == 'artistReference'=>@->${artistProjection},
    _type == 'eventReference'=>@->${eventProjection},
    _type == 'youtubeReference'=>@->${youtubeProjection},
    _type == 'programReference'=>@->${programProjection},
    _type == 'queryReference'=>@->${queryProjection},
    _type == 'listReference'=>@->${listProjection},
    _type == 'imageSection'=>${imageSectionProjection},
}`

export const sidebarProjection = groq`{
    mobile,
    _key,
    ...imageSection{...${imageSectionProjection}},
    ...hero,
    ...textInput,
    ...artistReference->${artistProjection},
    ...eventReference->${eventProjection},
    ...programReference->${programProjection},
    ...queryReference->${queryProjection},
    ...listReference->${listProjection},
    }`

export const mainPageQuery = groq`*[_type == "page" && slug.current == $slug][0]{
    ...,
     content[]{
         ...${contentProjection}
     },
    sidebar1[]{
        ...${sidebarProjection}
    },
    sidebar2[]{
        ...${sidebarProjection}
    },
}`
