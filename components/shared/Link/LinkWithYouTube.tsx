import { SerializedStyles } from "@emotion/react";
import React, { AnchorHTMLAttributes, useEffect, useState } from "react";
import { YOUTUBE_CHANNEL_URL } from "../../../const/public";
import { LinkProps, Link as LinkWithoutYouTube } from "./Link";

const seenVideoStorageKey = "seenVideoStorageKey-";
const youTubeVideoUrls = {
    beginner_grammar1: "https://youtu.be/6gdQS1djlL8",
    how_to_say_you: "https://youtu.be/CHFBq9xjOD4",
    how_to_say_do: "https://youtu.be/K1sDYLPunJ8",
    channel_page: YOUTUBE_CHANNEL_URL,
} as const;

function recentlyAccessed(strSavedDate: string | null): boolean {
    if (strSavedDate) {
        const date = new Date(strSavedDate);
        const dif = new Date().getTime() - date.getTime();
        if (dif < 1000 * 60 * 60 * 24) {
            // Accessed within 24 hour
            return true;
        }
    }
    return false;
}

export function Link(props: LinkProps) {
    const [unseenVideo, setUnseenVideo] = useState<
        keyof typeof youTubeVideoUrls | null
    >(null);

    useEffect(() => {
        const v = Object.keys(youTubeVideoUrls).find(
            k =>
                !recentlyAccessed(localStorage.getItem(seenVideoStorageKey + k))
        ) as keyof typeof youTubeVideoUrls | null;
        if (v) {
            setUnseenVideo(v);
        }
    }, []);

    if (unseenVideo) {
        const { onClick, pCss, ...rest } = props;
        return (
            <a
                target="_blank"
                rel={"noopener noreferrer"}
                {...rest}
                onClick={(...args) => {
                    onClick?.(...args);
                    setTimeout(() => {
                        location.href = youTubeVideoUrls[unseenVideo];
                    }, 1000);
                    localStorage.setItem(
                        seenVideoStorageKey + unseenVideo,
                        new Date().toISOString()
                    );
                }}
                css={pCss}
            />
        );
    }
    return <LinkWithoutYouTube {...props} />;
}

export function A(
    props: AnchorHTMLAttributes<HTMLAnchorElement> & { pCss?: SerializedStyles }
) {
    const [unseenVideo, setUnseenVideo] = useState<
        keyof typeof youTubeVideoUrls | null
    >(null);

    useEffect(() => {
        const v = Object.keys(youTubeVideoUrls).find(
            k =>
                !recentlyAccessed(localStorage.getItem(seenVideoStorageKey + k))
        ) as keyof typeof youTubeVideoUrls | null;
        if (v) {
            setUnseenVideo(v);
        }
    }, []);

    if (unseenVideo) {
        const { onClick, pCss, ...rest } = props;
        return (
            <a
                target="_blank"
                rel={"noopener noreferrer"}
                {...rest}
                onClick={(...args) => {
                    onClick?.(...args);
                    setTimeout(() => {
                        location.href = youTubeVideoUrls[unseenVideo];
                    }, 1000);
                    localStorage.setItem(
                        seenVideoStorageKey + unseenVideo,
                        new Date().toISOString()
                    );
                }}
                css={pCss}
            />
        );
    }
    const { pCss, ...rest } = props;
    return <a {...rest} css={pCss} />;
}
