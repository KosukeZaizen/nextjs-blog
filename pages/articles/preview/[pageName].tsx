import { GetServerSideProps } from "next";
import { domain, siteName } from "..";
import { getImgNumber } from "../../../components/articles/Layout";
import { fetchZAppsFromServerSide } from "../../../lib/fetch";
import { makeIndexInfo } from "../../api/articles/getArticleProps";
import Articles, { Page, Props } from "../[pageName]";

export default Articles;

export const getServerSideProps: GetServerSideProps<
    Props,
    { pageName: string }
> = async ({ params }) => {
    try {
        const pageName = params?.pageName;
        if (!pageName) {
            return { notFound: true };
        }

        // Redirect to lower case
        const lowerPageName = pageName.toLowerCase();
        if (pageName !== lowerPageName) {
            return {
                redirect: {
                    permanent: true,
                    destination: lowerPageName,
                },
            };
        }

        // Article
        const response: Response = await fetchZAppsFromServerSide(
            `api/Articles/GetArticleForEdit?p=${pageName}`
        );
        const {
            url,
            description,
            title,
            isAboutFolktale,
            articleContent,
        }: Page = await response.json();

        // Other articles
        const param = `?num=10&${
            isAboutFolktale ? "&isAboutFolktale=true" : ""
        }`;
        const articles: Page[] = await (
            await fetchZAppsFromServerSide(
                "api/Articles/GetRandomArticles" + param
            )
        ).json();

        const otherArticles = articles.filter(a => a.title !== title);

        const indexInfo = makeIndexInfo(articleContent);

        return {
            props: {
                pageName,
                url,
                description,
                title,
                isAboutFolktale,
                articleContent,
                indexInfo,
                imgNumber: getImgNumber(pageName.length),
                otherArticles,
                helmetProps: {
                    title,
                    desc: description,
                    domain,
                    siteName,
                    noindex: true,
                },
            },
        };
    } catch {
        return { notFound: true };
    }
};
