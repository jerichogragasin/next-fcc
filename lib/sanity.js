import {
    createClient,
    createPreviewSubscriptionHook,
} from "next-sanity";

import { 
    PortableText as PortableTextComponent 
} from '@portabletext/react';

import createImageUrlBuilder from '@sanity/image-url';
import imageUrlBuilder from '@sanity/image-url'


const config = {
    projectId: "hj97ak53",
    dataset: "production",
    apiVersion: "2021-10-21",
    useCdn: false,
}

export const sanityClient = createClient(config);
export const usePreviewSubscription = createPreviewSubscriptionHook(config);

//Portable text now is not reciveing blocks as props, use values={data} instead
export const PortableText = (props) => <PortableTextComponent components={{}} {...props} />



//Custom urlFor function for generating image links using sanity's default url builder
const builder = imageUrlBuilder(sanityClient);

export function urlFor(source) {
  return builder.image(source)
}
