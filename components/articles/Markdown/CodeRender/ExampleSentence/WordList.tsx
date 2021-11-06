import { css } from "@emotion/react";
import { Collapse } from "@material-ui/core";
import React from "react";
import { centerStyle } from "../../../../../pages/articles/[pageName]";
import { sentence, word } from "../../../../../types/stories";
import markdownStyles from "../../index.module.css";

interface WordListProps {
    words: { [key: number]: word[] };
    s: sentence;
    storyId: number;
}
export class WordList extends React.Component<
    WordListProps,
    {
        showWordList: boolean;
    }
> {
    constructor(props: WordListProps) {
        super(props);

        this.state = {
            showWordList: false,
        };
    }

    showWordList = () => {
        this.setState({ showWordList: true });
    };

    hideWordList = () => {
        this.setState({ showWordList: false });
    };

    render() {
        return (
            <span>
                {this.props.words &&
                this.props.words[this.props.s.lineNumber] ? (
                    this.state.showWordList ? (
                        <button
                            style={{
                                marginTop: 5,
                                marginBottom: 2,
                                height: 28,
                                paddingTop: 0,
                                color: "white",
                            }}
                            className="btn btn-dark btn-xs"
                            onClick={this.hideWordList}
                        >
                            ▲　Hide vocabulary list
                        </button>
                    ) : (
                        <button
                            style={{
                                marginTop: 5,
                                height: 28,
                                paddingTop: 0,
                                color: "white",
                            }}
                            className="btn btn-primary btn-xs"
                            onClick={this.showWordList}
                        >
                            ▼　Show vocabulary list
                        </button>
                    )
                ) : null}
                <Collapse in={this.state.showWordList} timeout={1000}>
                    <div
                        css={css`
                            background-color: #f8f7f8;
                            max-width: 700px;
                            margin-left: 0;
                            margin-right: auto;
                            ${centerStyle}
                        `}
                    >
                        <table
                            className={markdownStyles.exclude}
                            style={{ fontSize: "normal" }}
                        >
                            <tbody>
                                {this.props.words &&
                                    this.props.words[
                                        this.props.s.lineNumber
                                    ]?.map(w => (
                                        <tr key={w.wordNumber}>
                                            <td
                                                style={{
                                                    minWidth: 100,
                                                    border: "1px solid",
                                                }}
                                            >
                                                {w.kanji}
                                                <br />
                                                {w.hiragana
                                                    ? `(${w.hiragana})`
                                                    : null}
                                            </td>
                                            <td
                                                style={{
                                                    paddingLeft: 3,
                                                    paddingRight: 3,
                                                    border: "1px solid",
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        display: "inline-block",
                                                        textAlign: "left",
                                                    }}
                                                >
                                                    {w.english}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </Collapse>
            </span>
        );
    }
}
