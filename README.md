# yandex-tank-metrics
Yandex Tank plugin for offline data visualization.
Creates simple HTML page with charts from test_data.log and monitoring.log

Usage:
    -put Metrics folder into yandextank/plugins
    -insert this line into load.ini: plugin_metrics=yandextank.plugins.Metrics
    -run with command: yandex-tank -c load.ini
    -watch logs/<current_log_name>/metrics.html for results

Sample yandex-tank config load.ini:
    [tank]
    plugin_metrics=yandextank.plugins.Metrics

    [phantom]
    address = 127.0.0.1:80
    rps_schedule = line(1, 100, 3m)
    uris = /
