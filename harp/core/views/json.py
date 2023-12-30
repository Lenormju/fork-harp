import traceback
from json import dumps

from whistle import IEventDispatcher

from harp.core.asgi.events import EVENT_CORE_VIEW
from harp.core.asgi.events.view import ViewEvent


class json(dict):
    """
    This is a marked dict type that our view event listener will recognize and serialize to json in a response.

    Usage::

        def handler():
            return json({"foo": "bar"})

    """

    pass


async def on_json_response(event: ViewEvent):
    if isinstance(event.value, json):
        response = event.response
        response.headers["content-type"] = "application/json"

        try:
            serialized = dumps(event.value)
            await response.start(status=200)
            await response.body(serialized)
        except TypeError as exc:
            await response.start(status=500)
            await response.body(
                dumps(
                    {
                        "error": "Cannot serialize response to json.",
                        "type": type(exc).__name__,
                        "message": str(exc),
                        "traceback": traceback.format_exc(),
                        "value": repr(event.value),
                    },
                )
            )

        event.stop_propagation()


def register(dispatcher: IEventDispatcher):
    dispatcher.add_listener(EVENT_CORE_VIEW, on_json_response)
