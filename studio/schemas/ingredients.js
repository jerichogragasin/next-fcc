export default {
    name: "ingredient",
    title: "Ingredient",
    type: "document",
    fields: [
        {
            name: "name",
            title: "Ingredient Name",
            type: "string",
        },
        {
            name: "image",
            title: "Image",
            type: "image",
            optios: 
                {
                    hotspot: "true"
                }
        },
        {
            name: "notes",
            title: 'Notes',
            type: "text",
        }
    ]
}