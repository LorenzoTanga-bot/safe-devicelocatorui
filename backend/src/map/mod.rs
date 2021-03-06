use std::fs;
use std::path::{Path, PathBuf};
use std::sync::mpsc::{channel};
use std::thread::{sleep, spawn};
use std::time::Duration;
use json::{JsonValue, Error};
use crate::city_api::Bounds;
use crate::data;
use crate::data::{reset_temp_folder, remove_temp_folder};

mod coordinates;
mod tiles;
mod zip;

#[derive(Eq, PartialEq, Hash, Clone)]
pub struct TileCoords {
    pub zoom: i32,
    pub x: i32,
    pub y: i32,
}

pub async fn download_map(bounds: Bounds, min_zoom: i32, max_zoom: i32) {
    reset_temp_folder();
    let coordinates = coordinates::get_tiles_coordinates(bounds, max_zoom, min_zoom);
    let total = coordinates.len();
    let (tx, rx) = channel();
    let receiver = spawn(move || {
        while rx.try_recv().is_err() {
            println!("{}%", tiles::get_percent(total));
            sleep(Duration::from_secs(5));
        }
    });
    tiles::get_map_tiles(coordinates).await;
    tx.send(());
    receiver.join();
}

pub fn zip(city_name: &str) {
    println!("Zipping files");
    zip::zip_tiles(city_name);
    remove_temp_folder();
}

pub fn get_dir() -> PathBuf {
    return data::get_data_dir().join(Path::new("tiles"));
}
