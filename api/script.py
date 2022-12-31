import jwt
from datetime import datetime, timedelta, timezone


AUTH_KEY = "my_secret"


ALGORITHM = "HS256"

data_token = {
    "sub": 123456789,
    "exp": datetime.now(timezone.utc) - timedelta(minutes=1),
}
token = jwt.encode(data_token, AUTH_KEY[:3], ALGORITHM)
print(token)

# , options={"require": ["exp"],
#  "verify_signature": True, "verify_exp": True}
try:
    decoded = jwt.decode(token, AUTH_KEY, ALGORITHM, options={"require": ["exp"],
                                                              "verify_signature": True, "verify_exp": True})

    id = decoded["sub"]
except jwt.exceptions.ExpiredSignatureError:
    print("eexpirou")
except jwt.exceptions.InvalidSignatureError:
    print("ma sign")
except Exception:
    print("erro")

print(id)
