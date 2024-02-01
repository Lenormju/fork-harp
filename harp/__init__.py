import os
from subprocess import check_output

ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# last release
__version__ = "0.4.0"
__revision__ = __version__  # we can't commit the not yet known revision

# override with version.txt if available (after docker build for example)
if os.path.exists(os.path.join(ROOT_DIR, "version.txt")):
    with open(os.path.join(ROOT_DIR, "version.txt")) as f:
        __version__ = f.read().strip()

# override with current development version/revision if available (disabled in CI, for docs)
if not os.environ.get("CI", False) and os.path.exists(os.path.join(ROOT_DIR, ".git")):
    __revision__ = check_output(["git", "rev-parse", "HEAD"], cwd=ROOT_DIR).decode("utf-8").strip()
    try:
        __version__ = (
            check_output(["git", "describe", "--tags", "--always", "--dirty"], cwd=ROOT_DIR).decode("utf-8").strip()
        )
    except Exception:
        __version__ = __revision__[:7]

from ._logging import get_logger  # noqa: E402, isort: skip
from harp.config import Config  # noqa: E402, isort: skip

__all__ = [
    Config,
    ROOT_DIR,
    __revision__,
    __version__,
    get_logger,
]
