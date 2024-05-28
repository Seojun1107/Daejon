import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const Wrap = styled.div`
    width: 100%;
    height: 100%;
`;

const H1 = styled.h1`
    font-size: 25px;
    margin-bottom: 30px;
`;

const Input = styled.input`
    width: 100%;
    height: 40px;
    outline: none;
    border: 0;
    font-size: 16px;
    padding-left: 5px;
    border-bottom: 1px solid black;
    transition: border-bottom-color 0.3s ease-in-out;
    margin-bottom: 30px;
    &:focus {
        border-bottom-color: blue;
    }
`;

const Ul = styled.ul`
    position: relative;
    width: 100%;
    height: 100%;
`;

const Li = styled.li`
    position: relative;
    width: 100%;
    height: 55px;
    margin-bottom: 20px;
    border-radius: 10px;
    padding: 5px 15px;
    transition: transform 0.3s ease-in-out;
    &:hover {
        background-color: #e9e9e9;
        transform: scale(0.99);
    }
`;

const SchoolName = styled.h3`
    position: relative;
    text-justify: end;
    font-size: 16px;
`;

const SchoolAdress = styled.p`
    position: absolute;
    bottom: 2px;
    font-size: 11px;
`;

const MealDiv = styled.div`
    margin-top: 20px;
    font-size: 18px;
    padding: 20px;
    background-color: #f0f0f0;
    border-radius: 10px;
`;

function AddSchool(props) {
    const [schoolName, setSchoolName] = useState("");
    const [schoolInfo, setSchoolInfo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showList, setShowList] = useState(true);
    const [SD_SCHUL_CODE, setSD_SCHUL_CODE] = useState(localStorage.getItem('SD_SCHUL_CODE') || "");
    const [ATPT_OFCDC_SC_CODE, setATPT_OFCDC_SC_CODE] = useState(localStorage.getItem('ATPT_OFCDC_SC_CODE') || "");
    const [meal, setMeal] = useState();

    useEffect(() => {
        if (SD_SCHUL_CODE && ATPT_OFCDC_SC_CODE) {
            fetchMeal();
        }
    }, [SD_SCHUL_CODE, ATPT_OFCDC_SC_CODE]);

    useEffect(() => {
        if (!schoolName) return;

        const delayDebounceFn = setTimeout(() => {
            setLoading(true);

            axios.get("https://open.neis.go.kr/hub/schoolInfo", {
                params: {
                    SCHUL_NM: schoolName,
                    Type: "json",
                    pIndex: 1,
                    pSize: 10,
                    KEY: "7a246e93b3dd4623bff42f88296e2a0f"
                }
            })
            .then(response => {
                const schoolData = response.data.schoolInfo[1].row;
                setSchoolInfo(schoolData);
                setLoading(false);
            })
            .catch(error => {
                console.log(error);
                setError(error.message);
                setLoading(false);
            });
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [schoolName]);

    const fetchMeal = () => {
        if (!SD_SCHUL_CODE || !ATPT_OFCDC_SC_CODE) return;

        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');

        axios.get("https://open.neis.go.kr/hub/mealServiceDietInfo", {
            params: {
                ATPT_OFCDC_SC_CODE: ATPT_OFCDC_SC_CODE,
                SD_SCHUL_CODE: SD_SCHUL_CODE,
                MLSV_YMD: `${year}${month}${day}`,
                KEY: "7a246e93b3dd4623bff42f88296e2a0f",
                Type: "json"
            }
        })
        .then(response => {
            const mealData = response.data.mealServiceDietInfo[1].row[0];
            setMeal(mealData);
        })
        .catch(error => {
            console.log(error);
            setError(error.message);
        });
    }

    const handleChangeSchool = () => {
        setMeal(null);
        setShowList(true);
        setSchoolName("");
        localStorage.removeItem('SD_SCHUL_CODE');
        localStorage.removeItem('ATPT_OFCDC_SC_CODE');
        setSD_SCHUL_CODE("");
        setATPT_OFCDC_SC_CODE("");
    }

    const handleSelectSchool = (school) => {
        setSD_SCHUL_CODE(school.SD_SCHUL_CODE);
        setATPT_OFCDC_SC_CODE(school.ATPT_OFCDC_SC_CODE);
        localStorage.setItem('SD_SCHUL_CODE', school.SD_SCHUL_CODE);
        localStorage.setItem('ATPT_OFCDC_SC_CODE', school.ATPT_OFCDC_SC_CODE);
        setShowList(false);
        fetchMeal();
        
    }

    return (
        <Wrap>
            <H1>현재 재학중인<br />학교를 입력해주세요!</H1>
            <Input 
                type="text" 
                value={schoolName} 
                onChange={(e) => setSchoolName(e.target.value)}
            />
            {loading && <p>로딩중...</p>}
            {schoolInfo && showList && (
                <Ul>
                    {schoolInfo.map((school, index) => (
                        <Li key={index} onClick={() => handleSelectSchool(school)}>
                            <SchoolName>{school.SCHUL_NM}</SchoolName>
                            <SchoolAdress>{school.ORG_RDNMA + school.ORG_RDNDA}</SchoolAdress>
                        </Li>
                    ))}
                </Ul>
            )}
            {meal && (
                <MealDiv>
                    <h3>오늘의 급식</h3>
                    <button onClick={handleChangeSchool}>학교 변경</button>
                    <p dangerouslySetInnerHTML={{ __html: meal.DDISH_NM.replace(/<br\/>/g, '<br/>') }} />
                </MealDiv>
            )}
        </Wrap>
    );
}

export default AddSchool;
