from yaml import dump as yaml_dump
from yaml import load as yaml_load
from yaml import safe_load as yaml_safe_load

try:
    from yaml import CDumper as Dumper
    from yaml import CLoader as Loader
except ImportError:
    from yaml import Dumper, Loader


def load(filename):
    with open(filename) as f:
        return yaml_load(f, Loader=Loader)


safe_load = yaml_safe_load


def dump(data, stream=None, **kwargs):
    return yaml_dump(data, stream, Dumper=Dumper, **kwargs)
