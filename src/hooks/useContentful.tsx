import NoticeEntity from "@dto/notice.entity";
import { errorRes, Option, successRes } from "@utils/options";
import { createClient } from "contentful";

const useContentful = () => {
    const client = createClient({
        space: "wm26cyc3xpas",
        accessToken: "ihHmZf6NeDqHnXsJ6zIfzdOy5DjxLqalxKHbVznSU6o",
        host: "cdn.contentful.com"
    });

    const getNotices = async (): Promise<Option<NoticeEntity[]>> => {
        try {
            const entries = await client.getEntries({
                content_type: "notice",
                order: 'sys.updatedAt'
            });

            const sanitizedEntries = entries.items.map((item: any) => {
                const fields = item.fields as any
                return {
                    id: item.sys.id,
                    title: fields.title,
                    content: fields.content,
                    createdAt: fields.createdAt,
                    updatedAt: fields.updatedAt
                };
            });

            return successRes({
                status: 200,
                data: sanitizedEntries
            });
        } catch (error) {
            return errorRes(`Error fetching notice ${error}`)
        }
    };


    const getNotice = async (id: string): Promise<Option<NoticeEntity>> => {
        try {
            const entrie = await client.getEntry(id);
            const fields = entrie.fields as NoticeEntity

            return successRes({
                status: 200,
                data: {
                    id: entrie.sys.id,
                    title: fields.title,
                    content: fields.content,
                    createdAt: fields.createdAt,
                    updatedAt: fields.updatedAt
                }
            })
        } catch (error) {
            return errorRes(`Error fetching notice ${error}`)
        }
    };


    return { getNotices, getNotice };
};

export default useContentful;
