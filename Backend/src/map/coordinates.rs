use std::collections::HashSet;
use crate::map::TileCoords;
use crate::device::Device;

static SURROUNDING_RANGE: f32 = 0.045;
static CITY_RANGE: f32 = 0.01;
static DEVICE_RANGE: f32 = 0.0018;

pub fn get_tiles_coordinates(city_lat: f32, city_lon: f32, devices: HashSet<Device>) -> HashSet<TileCoords>{
    let mut coordinates = HashSet::new();

    for z in 15..18 {
        let (min_x, min_y) = deg2num(city_lat+SURROUNDING_RANGE, city_lon-SURROUNDING_RANGE, z);
        let (max_x, max_y) = deg2num(city_lat-SURROUNDING_RANGE, city_lon+SURROUNDING_RANGE, z);
        for _x in min_x..max_x {
            for _y in min_y..max_y {
                coordinates.insert(TileCoords {zoom:z, x:_x, y:_y});
            }
        }
    }
    for z in 15..20 {
        let (min_x, min_y) = deg2num(city_lat+CITY_RANGE, city_lon-CITY_RANGE, z);
        let (max_x, max_y) = deg2num(city_lat-CITY_RANGE, city_lon+CITY_RANGE, z);
        for _x in min_x..max_x {
            for _y in min_y..max_y {
                coordinates.insert(TileCoords {zoom:z, x:_x, y:_y});
            }
        }
    }
    for device in devices{
        for z in 15..23 {
            let (min_x, min_y) = deg2num(device.lat+DEVICE_RANGE, device.lon-DEVICE_RANGE, z);
            let (max_x, max_y) = deg2num(device.lat-DEVICE_RANGE, device.lon+DEVICE_RANGE, z);
            for _x in min_x..max_x {
                for _y in min_y..max_y {
                    coordinates.insert(TileCoords {zoom:z, x:_x, y:_y});
                }
            }
        }
    }
    return coordinates;
}

fn deg2num(lat_deg: f32, lon_deg: f32, _zoom: i32) -> (i32, i32) {
    let lat_rad = lat_deg.to_radians();
    let mut n: f64 = 2.00;
    n = n.powi(_zoom);
    let x_tile = ((lon_deg as f64 + 180.0) / 360.0 * n) as i32;
    let y_tile = ((1.0 - (((lat_rad as f64).tan()).asinh()) / std::f64::consts::PI) / 2.0 * n) as i32;
    return (x_tile, y_tile);
}