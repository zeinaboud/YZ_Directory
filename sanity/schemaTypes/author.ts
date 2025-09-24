import { defineField, defineType } from 'sanity';
import { FaUserAlt } from "react-icons/fa";
export const author = defineType({
    title: 'author',
    name: "author",
    type: 'document',
    icon: FaUserAlt,
    fields: [
        defineField({
            name: 'id',
            type: 'string',
        }),
        defineField({
            name: 'name',
            type: 'string',
        }),
        defineField({
            name: 'username',
            type: 'string',
        }),
        defineField({
            name: 'email',
            type: 'string',
        }),
        defineField({
            name: 'image',
            type: 'url',
        }),
    ],
    preview: {
        select: {
            title: "name",
        },
    },
});