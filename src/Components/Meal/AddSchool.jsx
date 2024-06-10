import React, { useState, useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";
import axios from "axios";
import { CSSTransition } from "react-transition-group";
import Meal from "./Meal";
import "./AddSchool.css";

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Helvetica Neue', Arial, sans-serif;
    background-color: #f4f6f8;
    color: #333;
    margin: 0;
    padding: 0;
  }
`;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  min-height: 100vh;
  background: #f4f6f8;
`;

const H1 = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 40px;
`;

const Input = styled.input`
  width: 100%;
  max-width: 500px;
  height: 50px;
  outline: none;
  border: 0;
  font-size: 18px;
  padding-left: 10px;
  border-bottom: 2px solid #bdc3c7;
  transition: border-bottom-color 0.3s ease-in-out;
  margin-bottom: 40px;
  background: #ecf0f1;
  border-radius: 8px;
  &:focus {
    border-bottom-color: #3498db;
    background: #ffffff;
  }
`;

const Ul = styled.ul`
  width: 100%;
  max-width: 500px;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const Li = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  padding: 15px;
  margin-bottom: 20px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  cursor: pointer;
  &:hover {
    background-color: #e9f0f7;
    transform: scale(1.02);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

const SchoolName = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  color: #34495e;
`;

const SchoolAddress = styled.p`
  margin: 5px 0 0;
  font-size: 14px;
  color: #7f8c8d;
`;

function AddSchool(props) {
    const [schoolName, setSchoolName] = useState("");
    const [schoolInfo, setSchoolInfo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [nextError, setNextError] = useState(null);
    const [dayAfterNextError, setDayAfterNextError] = useState(null);
    const [showList, setShowList] = useState(!(localStorage.getItem('SD_SCHUL_CODE') && localStorage.getItem('ATPT_OFCDC_SC_CODE')));
    const [SD_SCHUL_CODE, setSD_SCHUL_CODE] = useState(localStorage.getItem('SD_SCHUL_CODE') || "");
    const [ATPT_OFCDC_SC_CODE, setATPT_OFCDC_SC_CODE] = useState(localStorage.getItem('ATPT_OFCDC_SC_CODE') || "");
    const [meal, setMeal] = useState();
    const [tomorrowMeal, setTomorrowMeal] = useState();
    const [dayAfterNextMeal, setDayAfterNextMeal] = useState();

    useEffect(() => {
        if (SD_SCHUL_CODE && ATPT_OFCDC_SC_CODE) {
            fetchMeals();
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
                setLoading(false);
            });
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [schoolName]);

    const fetchMeals = () => {
        if (!SD_SCHUL_CODE || !ATPT_OFCDC_SC_CODE) return;

        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const tomorrowYear = tomorrow.getFullYear();
        const tomorrowMonth = String(tomorrow.getMonth() + 1).padStart(2, '0');
        const tomorrowDay = String(tomorrow.getDate()).padStart(2, '0');

        const dayAfterNext = new Date(today);
        dayAfterNext.setDate(dayAfterNext.getDate() + 2);
        const dayAfterNextYear = dayAfterNext.getFullYear();
        const dayAfterNextMonth = String(dayAfterNext.getMonth() + 1).padStart(2, '0');
        const dayAfterNextDay = String(dayAfterNext.getDate()).padStart(2, '0');

        const todayMealRequest = axios.get("https://open.neis.go.kr/hub/mealServiceDietInfo", {
            params: {
                ATPT_OFCDC_SC_CODE: ATPT_OFCDC_SC_CODE,
                SD_SCHUL_CODE: SD_SCHUL_CODE,
                MLSV_YMD: `${year}${month}${day}`,
                KEY: "7a246e93b3dd4623bff42f88296e2a0f",
                Type: "json"
            }
        });

        const tomorrowMealRequest = axios.get("https://open.neis.go.kr/hub/mealServiceDietInfo", {
            params: {
                ATPT_OFCDC_SC_CODE: ATPT_OFCDC_SC_CODE,
                SD_SCHUL_CODE: SD_SCHUL_CODE,
                MLSV_YMD: `${tomorrowYear}${tomorrowMonth}${tomorrowDay}`,
                KEY: "7a246e93b3dd4623bff42f88296e2a0f",
                Type: "json"
            }
        });

        const dayAfterNextMealRequest = axios.get("https://open.neis.go.kr/hub/mealServiceDietInfo", {
            params: {
                ATPT_OFCDC_SC_CODE: ATPT_OFCDC_SC_CODE,
                SD_SCHUL_CODE: SD_SCHUL_CODE,
                MLSV_YMD: `${dayAfterNextYear}${dayAfterNextMonth}${dayAfterNextDay}`,
                KEY: "7a246e93b3dd4623bff42f88296e2a0f",
                Type: "json"
            }
        });

        Promise.all([todayMealRequest, tomorrowMealRequest, dayAfterNextMealRequest])
            .then(([todayResponse, tomorrowResponse, dayAfterNextResponse]) => {
                if (todayResponse.data.mealServiceDietInfo && todayResponse.data.mealServiceDietInfo[1]) {
                    const todayMealData = todayResponse.data.mealServiceDietInfo[1].row[0];
                    setMeal(todayMealData);
                } else {
                    setMeal(null);
                    setError("오늘은 주말 혹은 휴일이에요!");
                }

                if (tomorrowResponse.data.mealServiceDietInfo && tomorrowResponse.data.mealServiceDietInfo[1]) {
                    const tomorrowMealData = tomorrowResponse.data.mealServiceDietInfo[1].row[0];
                    setTomorrowMeal(tomorrowMealData);
                } else {
                    setTomorrowMeal(null);
                    setNextError("내일은 주말 혹은 휴일이에요!");
                }

                if (dayAfterNextResponse.data.mealServiceDietInfo && dayAfterNextResponse.data.mealServiceDietInfo[1]) {
                    const dayAfterNextMealData = dayAfterNextResponse.data.mealServiceDietInfo[1].row[0];
                    setDayAfterNextMeal(dayAfterNextMealData);
                } else {
                    setDayAfterNextMeal(null);
                    setDayAfterNextError("모레는 주말 혹은 휴일이에요!");
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    const handleChangeSchool = () => {
        setMeal();
        setTomorrowMeal();
        setDayAfterNextMeal();
        setError();
        setNextError();
        setDayAfterNextError();
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
        fetchMeals();
    }

    return (
        <>
            <GlobalStyle />
            <Wrap>
                <CSSTransition
                    in={showList}
                    timeout={300}
                    classNames="fade"
                    unmountOnExit
                >
                    <>
                        <H1>현재 재학중인 학교를 입력해주세요!</H1>
                        <Input 
                            type="text" 
                            value={schoolName} 
                            onChange={(e) => setSchoolName(e.target.value)}
                            placeholder="학교 이름 입력"
                        />
                    </>
                </CSSTransition>
                {loading && <p>로딩중...</p>}
                {schoolInfo && showList && (
                    <Ul>
                        {schoolInfo.map((school, index) => (
                            <Li key={index} onClick={() => handleSelectSchool(school)}>
                                <SchoolName>{school.SCHUL_NM}</SchoolName>
                                <SchoolAddress>{school.ORG_RDNMA + school.ORG_RDNDA}</SchoolAddress>
                            </Li>
                        ))}
                    </Ul>
                )}
                {meal ? (
                    <Meal
                        title="오늘의 급식"
                        mealContent={meal.DDISH_NM}
                        onChangeSchool={handleChangeSchool}
                    />
                ) : (
                    error && (
                        <Meal
                            title="오늘의 급식"
                            mealContent={error}
                            onChangeSchool={handleChangeSchool}
                        />
                    )
                )}
                
                {tomorrowMeal ? (
                    <Meal
                        title="내일의 급식"
                        mealContent={tomorrowMeal.DDISH_NM}
                    />
                ) : (
                    nextError && (
                        <Meal
                            title="내일의 급식"
                            mealContent={nextError}
                        />
                    )
                )}

                {dayAfterNextMeal ? (
                    <Meal
                        title="모레의 급식"
                        mealContent={dayAfterNextMeal.DDISH_NM}
                    />
                ) : (
                    dayAfterNextError && (
                        <Meal
                            title="모레의 급식"
                            mealContent={dayAfterNextError}
                        />
                    )
                )}
            </Wrap>
        </>
    );
}

export default AddSchool;
