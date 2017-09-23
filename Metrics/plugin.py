""" Metrics plugin """
import os
import re
import logging
import shutil
 
from ...common.interfaces import AbstractPlugin
 
logger = logging.getLogger(__name__)
 
 
class Plugin(AbstractPlugin):
    """ Metrics tank plugin """
    SECTION = 'metrics'
 

    def __init__(self, core, cfg, cfg_updater):
        AbstractPlugin.__init__(self, core, cfg, cfg_updater)
        self.metrics_out_path = os.path.join(self.core.artifacts_dir, 'metrics')
 

    def post_process(self, rc):
        self.metrics_structure_builder(self.metrics_out_path)
        self.parse_test_data_log_to_js_obj(os.path.join(self.core.artifacts_dir, 'test_data.log'))
        self.parse_monitoring_log_to_js_obj(os.path.join(self.core.artifacts_dir, 'monitoring.log'))
        return rc


    def metrics_structure_builder(self, log_dir):
        if not os.path.exists(log_dir):
            shutil.copytree(os.path.join(os.path.dirname(__file__), 'static'), log_dir, ignore=shutil.ignore_patterns('html'))
            shutil.copy(os.path.join(os.path.dirname(__file__), 'static', 'html', 'metrics.html'), self.core.artifacts_dir)
        else:
            logger.info('[METRICS]: Directory ' + log_dir + ' already exists!')
            
        logger.info('[METRICS]: Static content copied to ' + self.metrics_out_path)
    

    def parse_test_data_log_to_js_obj(self, log_file, object_name='test_data'):
        timestamps = [object_name + ' = [']
        pattern = re.compile('^\{.*\}$')
        with open(log_file) as f:
            for line in f:
                if pattern.match(line):
                    timestamps.append(line.strip() + ',')
        timestamps.append(']')
 
        with open(os.path.join(self.metrics_out_path, 'js', object_name + '.js'), 'w') as f:
            for line in timestamps:
                f.write(line + '\n')
 
        logger.info('[METRICS]: test_data.log parsed')


    def parse_monitoring_log_to_js_obj(self, log_file, object_name='monitoring'):
        timestamps = [object_name + ' = [']
        pattern = re.compile("^\[\{.*\}\]$")
        with open(log_file) as f:
            for line in f:
                if pattern.match(line):
                    timestamps.append(line.strip().strip('[]').replace('}}}}, ', '}}}}\n').replace('}}}}', '}}}},'))
        timestamps.append(']')
     
        with open(os.path.join(self.metrics_out_path, 'js', object_name + '.js'), 'w') as f:
            for line in timestamps:
                f.write(line + '\n')
        
        logger.info('[METRICS]: monitoring.log parsed')

