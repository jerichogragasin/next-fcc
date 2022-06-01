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

//exports
export const sanityClient = createClient(config);

export const usePreviewSubscription = createPreviewSubscriptionHook(config);

//migrated to portable text
export const PortableText = (props) => <PortableTextComponent components={{}} {...props} />

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source) {
  return builder.image(source)
}