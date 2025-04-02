import React, { useState, useEffect } from 'react'
import Overview from "../selections/Overview";
import Projects from "../selections/Projects";
import Weather from "../selections/Weather";
import Pokemon from '../selections/Pokemon';

import {WeatherData} from "../../../resources/interface";
import { useDispatch, useSelector } from "react-redux"
import { fetchWeatherStart, fetchWeatherSuccess, fetchWeatherFailure } from "@/lib/features/weatherSlice"
import { RootState } from '@/lib/store';
import Wordle from '../selections/Wordle';
import Guesser from '../selections/Guesser';
import Art from '../selections/Art';
import Music from '../selections/Music';


export default function MainContent() {

    const dispatch = useDispatch();

    const TBA = () => <div>TBA Content</div>;
    const currentPage = useSelector((state: RootState) => state.currentPage.currentPage);

    useEffect(() => {
        async function fetchWeatherData(city: string) {
            const apiKey = '129281c8b3974927a62162846252102'; // change key to work for yourself - jacob

            const url = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=7&aqi=no&alerts=no`;

            dispatch(fetchWeatherStart());
            
            try {
              const response = await fetch(url);
              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }
              const data: WeatherData = await response.json();
              console.log(data);
              dispatch(fetchWeatherSuccess(data));
              // setWeather(data);
            } catch (error) {
              dispatch(fetchWeatherFailure(error))
              // console.error('Error fetching weather data:', error);
            }
        }
		
		fetchWeatherData('Irving');
    }, [dispatch]);

     return (
        <div>
            {currentPage === 'overview' && <Overview />}
            {currentPage === 'projects' && <Projects />}
            {currentPage === 'artGallery' && <Art />}
            {currentPage === 'music' && <Music />}
            {currentPage === 'weather' && <Weather />}
            {currentPage === 'pokemon' && <Pokemon />}
            {currentPage === 'wordle' && <Wordle />}
            {currentPage === 'guesser' && <Guesser />}
            {currentPage === 'tba' && <TBA />}
        </div>
    );
}
