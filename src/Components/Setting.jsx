import React, { useState } from "react";
import styled from "styled-components";
import './theme.css';

const Wrap = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: white;
    border-radius: 10px;
    overflow: hidden;
    text-decoration: none;
`;

const Component = styled.div`
    display: flex;
    padding: 13px 0px 13px 10px;
    border-bottom: 0.5px solid gray;
    text-decoration-line: none;
    cursor: pointer;
`;

const Move = styled.a`
    text-decoration: none;
    color: black;
    width: 100%;
    height: 100%;
`;

const BackButton = styled.button`
    background: none;
    border: none;
    color: blue;
    cursor: pointer;
    margin-bottom: 10px;
`;

function Setting({ preventClose }) {
    const [showThemeSettings, setShowThemeSettings] = useState(false);

    return (
        <Wrap onClick={preventClose}>
            {showThemeSettings ? (
                <div>
                    <BackButton onClick={() => setShowThemeSettings(false)}>이전</BackButton>
                    <label htmlFor="theme" className="theme">
                        <span className="theme__toggle-wrap">
                            <input id="theme" className="theme__toggle" type="checkbox" role="switch" name="theme" value="dark" />
                            <span className="theme__fill"></span>
                            <span className="theme__icon">
                                <span className="theme__icon-part"></span>
                                <span className="theme__icon-part"></span>
                                <span className="theme__icon-part"></span>
                                <span className="theme__icon-part"></span>
                                <span className="theme__icon-part"></span>
                                <span className="theme__icon-part"></span>
                                <span className="theme__icon-part"></span>
                                <span className="theme__icon-part"></span>
                                <span className="theme__icon-part"></span>
                            </span>
                        </span>
                    </label>
                </div>
            ) : (
                <>
                    <Component onClick={() => setShowThemeSettings(true)}>테마설정</Component>
                    <Component>버그 신고</Component>
                    <Component>
                        <Move href="https://seojun1107.notion.site/8bd346467abb4c8d8739a426b53e0612?pvs=4">개인정보 처리방침</Move>
                    </Component>
                </>
            )}
        </Wrap>
    );
}

export default Setting;
