import { createClient } from "contentful";

const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_API_SPACE,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_API_TOKEN,
  host: process.env.NEXT_PUBLIC_CONTENTFUL_API_HOST,
});

export async function loadSubcommittee() {
  const res = await client
    .getEntries({
      content_type: "subcommittee",
      select: "fields",
      order: "fields.index",
    })
    .catch((error) => {
      console.error(error);
    });
  return res.items;
}