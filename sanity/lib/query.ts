import { defineQuery } from "next-sanity";
import { startup } from '../schemaTypes/startup';
import { author } from '../schemaTypes/author';

export const startup_query = defineQuery(`* [_type == 'startup' 
    && defined(slug.current) 
    &&  !defined($search)
    || title match $search 
    ||category match $search
    || author-> name match $search] 
    | order(_createAT desc){
        _id,
        title,
        slug,
        _createdAt,
        author => {
        _id , name , image , bio , username
        },
        views,
        description,
        category,
        image,
        pitch
}`);

export const startup_by_id_query = defineQuery(`* [_type == 'startup' 
    &&  _id == $id ][0]{
        _id,
        title,
        slug,
        _createdAt,
        author -> {
        _id , name , image , bio,username
        },
        views,
        description,
        category,
        image,
        pitch
}`);

export const startup_views_query = defineQuery(`
    *[_type == "startup" && _id == $id][0]{
  _id,
  views
}`)

export const author_by_github_id_query = defineQuery(`
    *[_type == "author" && id ==$id][0]{
        _id,
        id,
        name,
        username,
        email,
        image,
        bio
    }
    `)