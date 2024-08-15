import re


class RE(object):
    def __init__(self, pattern):
        self.pattern = re.compile(pattern)

    def __eq__(self, other):
        return self.pattern.match(other) is not None

    def __ne__(self, other):
        return self.pattern.match(other) is None

    def __repr__(self):
        return f"<RE {self.pattern.pattern}>"
