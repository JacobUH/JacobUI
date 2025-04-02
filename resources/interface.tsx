// weather interfaces
interface Location {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    tz_id: string;
    localtime_epoch: number;
    localtime: string;
}
  
interface Condition {
    text: string;
    icon: string;
    code: number;
}
  
interface Current {
    last_updated_epoch: number;
    last_updated: string;
    temp_c: number;
    temp_f: number;
    is_day: number;
    condition: Condition;
    wind_mph: number;
    wind_kph: number;
    wind_degree: number;
    wind_dir: string;
    pressure_mb: number;
    pressure_in: number;
    precip_mm: number;
    precip_in: number;
    humidity: number;
    cloud: number;
    feelslike_c: number;
    feelslike_f: number;
    windchill_c: number;
    windchill_f: number;
    heatindex_c: number;
    heatindex_f: number;
    dewpoint_c: number;
    dewpoint_f: number;
    vis_km: number;
    vis_miles: number;
    uv: number;
    gust_mph: number;
    gust_kph: number;
}

interface Hour {
    time: string;
    temp_f: number;
    is_day: number;
    condition: Condition;
    wind_mph: number;
    wind_degree: number;
    wind_dir: string;
    pressure_mb: number;
    precip_in: number;
    snow_cm: number;
    humidity: number;
    cloud: number;
    feelslike_f: number;
    windchill_f: number;
    heatindex_f: number;
    dewpoint_f: number;
    will_it_rain: number;
    chance_of_rain: number;
    will_it_snow: number;
    chance_of_snow: number;
    vis_miles: number;
    gust_mph: number;
    uv: number;
}

interface Day {
    maxtemp_f: number;
    mintemp_f: number;
    avgtemp_f: number;
    maxwind_mph: number;
    totalprecip_in: number;
    totalsnow_cm: number;
    avgvis_miles: number;
    avghumidity: number;
    daily_will_it_rain: number;
    daily_chance_of_rain: number;
    daily_will_it_snow: number;
    daily_chance_of_snow: number;
    condition: Condition;
    uv: number;
}

interface ForecastDay {
    date: string;
    day: Day;
    hour: Hour[];
}

interface forecast {
    forecastday: ForecastDay[]
}
  
export interface WeatherData {
    location: Location;
    current: Current;
    forecast: forecast
}
  
// Guesser interfaces
interface SearchMetadata {
    id: string;
    status: string;
    json_endpoint: string;
    created_at: string;
    processed_at: string;
    google_local_url: string;
    raw_html_file: string;
    total_time_taken: number;
}

interface SearchParameters {
    engine: string;
    q: string;
    location_requested: string;
    location_used: string;
    google_domain: string;
    hl: string;
    gl: string;
    device: string;
}

export interface LocalResult {
    map(arg0: (result: any, index: any) => import("react").JSX.Element): unknown;
    position: number;
    rating: number;
    reviews: number;
    reviews_original: string;
    price: string;
    lsig: string;
    thumbnail: string;
    service_options: {
        dine_in: boolean;
        takeout: boolean;
        delivery: boolean;
    };
    place_id: string;
    place_id_search: string;
    gps_coordinates: {
        latitude: number;
        longitude: number;
    };
    title: string;
    type: string;
    address: string;
}

export interface Results {
    search_metadata: SearchMetadata;
    search_parameters: SearchParameters;
    local_results: LocalResult[];
    // local_results: LocalResult;
}

export interface ApiResponse {
    total: number;
    total_pages: number;
    results: ApiResult[];
}
  
interface ApiResult {
    id: string;
    alt_description: string;
    asset_type: string;
    blur_hash: string;
    color: string;
    created_at: string;
    description: string;
    height: number;
    width: number;
    likes: number;
    liked_by_user: boolean;
    urls: Urls;
    links: Links;
    user: User;
}

interface Urls {
    full: string;
    raw: string;
    regular: string;
    small: string;
    small_s3: string;
    thumb: string;
}

interface Links {
    download: string;
    download_location: string;
    html: string;
    self: string;
}

interface User {
    id: string;
    username: string;
    name: string;
    first_name: string;
    last_name: string;
    portfolio_url: string;
    bio: string;
    location: string;
    instagram_username: string;
    total_photos: number;
    total_likes: number;
    for_hire: boolean;
    profile_image: ProfileImage;
}

interface ProfileImage {
    small: string;
    medium: string;
    large: string;
}
  
