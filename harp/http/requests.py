import binascii
from base64 import b64decode
from functools import cached_property

from multidict import CIMultiDictProxy, MultiDictProxy

from harp.http.typing import BaseHttpMessage, HttpRequestBridge
from harp.utils.http import parse_cookie


class HttpRequest(BaseHttpMessage):
    kind = "request"

    def __init__(self, impl: HttpRequestBridge):
        super().__init__()

        self._impl = impl

    @cached_property
    def server_ipaddr(self) -> str:
        """Get the server IP address from the implementation bridge."""
        return self._impl.get_server_ipaddr()

    @cached_property
    def server_port(self) -> int:
        """Get the server port from the implementation bridge."""
        return self._impl.get_server_port()

    @cached_property
    def method(self) -> str:
        """Get the HTTP method from the implementation bridge."""
        return self._impl.get_method()

    @cached_property
    def path(self) -> str:
        """Get the HTTP path from the implementation bridge."""
        return self._impl.get_path()

    @cached_property
    def query(self) -> MultiDictProxy:
        """Get the query string from the implementation bridge, as a read only proxy."""
        return MultiDictProxy(self._impl.get_query())

    @cached_property
    def headers(self) -> CIMultiDictProxy:
        return CIMultiDictProxy(self._impl.get_headers())

    # body, content, raw_body

    @cached_property
    def cookies(self) -> dict:
        """Parse and returns cookies from headers."""
        cookies = {}
        for header in self.headers.getall("cookie", []):
            cookies.update(parse_cookie(header))
        return cookies

    @cached_property
    def basic_auth(self) -> tuple[str, str] | None:
        """Parse and returns basic auth from headers."""
        for header in self.headers.getall("authorization", []):
            try:
                _type, _auth = header.split(" ", 1)
            except ValueError:
                continue

            if _type.lower() == "basic":
                try:
                    user, passwd = b64decode(_auth).decode("utf-8").split(":", 1)
                except (binascii.Error, ValueError):
                    continue

                return user, passwd
