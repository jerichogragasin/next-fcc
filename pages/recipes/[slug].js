import {
    sanityClient,
    urlFor,
    usePreviewSubscription,
    PortableText
} from '../../lib/sanity';


const recipeQuery = `*[_type == "recipe" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    mainImage,
    ingredient[]{
        _key,
        unit,
        wholeNumber,
        fraction,
        ingredient -> {
            name
        }
    },
    instructions,
    likes
}`;

export default function OneRecipe({data}) {
    const recipe = data.recipe;
    console.log(recipe.instructions)
    return(
        <article className='recipe'>
            <h1>
                {recipe.name}
            </h1>
            <main className='content'>
                <img src={urlFor(recipe?.mainImage).url()} alt={recipe.name} />
                <div className='breakdown'>
                    <ul className='ingredients'>
                        {recipe.ingredient?.map((ingredient)=> (
                            <li className='ingredient' key={ingredient._key}>
                                {ingredient?.wholeNumber}
                                {ingredient?.fraction}
                                
                                {ingredient?.unit}
                                <br />
                                {ingredient?.ingredient?.name}
                            </li>
                        ))}
                    </ul>
                    <div className='instructions'> 
                        <PortableText value={recipe?.instructions}/>
                    </div>
                </div>
            </main>
        </article>
    )
}

export async function getStaticPaths() {
    //access the slugs from the database and creates their own paths based on the current file path its related to
    const paths = await sanityClient.fetch(
        `*[_type == "recipe" && defined(slug.current)]{
            "params": {
                "slug": slug.current
            }
        }`
    );
    return {
        //returns the path for it to be usable
        paths,
        fallback: true
    };
}

export async function getStaticProps({params}) {
    const {slug} = params;
    const recipe = await sanityClient.fetch(
        recipeQuery,
        {slug}
    )

    return {
        props: {
            data: {
                recipe
            }
        }
    };
}