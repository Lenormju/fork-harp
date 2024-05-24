"""
The Command Line (:mod:`harp.commandline`) package bundles everything related to the `harp` command.

It contains an :func:`entrypoint` callable, built using `click`, which is called when you type `harp` in your terminal.

It is a high-level development helper: for example, `harp start` wraps `honcho`, a python process manager (foreman
clone) that can spawn multiple processes to help you with development.

Production environment will favour the lower-level `bin/entrypoint` script, that skips the process manager entirely
and runs the application server directly.

This may be subject to changes in the future (espacially to align/refactor arg parsers), but this approach works
well for now.

.. todo::

    @click.option('--prod/--dev', default=False, help="Set defaults for production or development environment (default
    to dev).")

    @click.option('--verbose', '-v', count=True)
    --verbose : change default log verbosity

    @click.option('--debug', is_flag=True)
    --debug : ?

    Manage process list / options using a class (with hierarchy for prod/dev, for example)
    If one process only, no honcho ? Or mayne no honcho manager ?

Contents
--------

.. click:: harp.commandline:entrypoint
   :prog: harp
   :nested: full

"""

from harp.commandline.install_dev import install_dev
from harp.commandline.server import server
from harp.commandline.start import start
from harp.settings import HARP_ENV
from harp.utils.commandline import check_packages, click

__title__ = "Command Line"

IS_DEVELOPMENT_ENVIRONMENT = False

if HARP_ENV == "dev" or check_packages("honcho", "watchfiles"):
    IS_DEVELOPMENT_ENVIRONMENT = True

if HARP_ENV == "prod":
    IS_DEVELOPMENT_ENVIRONMENT = False


@click.group()
def entrypoint():
    """HTTP Application Runtime Proxy (HARP)

    The following commands are available to help you setup and run your HTTP proxy application.

    """
    pass


if IS_DEVELOPMENT_ENVIRONMENT:
    entrypoint.add_command(start)
    entrypoint.add_command(install_dev)

entrypoint.add_command(server)

__all__ = [
    "entrypoint",
    "start",
    "install_dev",
]
