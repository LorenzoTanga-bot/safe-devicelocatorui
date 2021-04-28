import 'dart:convert';

import 'package:frontend/components/AnalyzesResponse.dart';
import 'package:frontend/components/BasicAuthConfig.dart';
import 'package:http/http.dart' as http;
import 'package:frontend/model/Sensor.dart';
import "package:latlong/latlong.dart";

class SensorController {
  String _baseUrl;

  SensorController(String ip) {
    _baseUrl = "http://$ip:8080/safeproject/api/sensors";
  }

  List<Sensor> _createSensor(String bodyRequest) {
    if (bodyRequest == "") return null;
    var jsonSensors = json.decode(bodyRequest);
    List<Sensor> sensors = [];
    for (var sensor in jsonSensors) {
      sensors.add(new Sensor(sensor["id"], sensor["name"],
          LatLng(sensor["lat"], sensor["lng"]), sensor["status"]));
    }

    return sensors;
  }

  Future<List<Sensor>> getSensors(String id) async {
    http.Response response = await http.get(Uri.parse("$_baseUrl/$id"),
        headers: BasicAuthConfig().getBaseHeader());
    AnalyzesResponse().checkResponse(response);

    return _createSensor(response.body);
  }
}