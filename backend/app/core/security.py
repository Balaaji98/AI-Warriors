import os, subprocess, pathlib
from datetime import datetime, timedelta
import jwt
from app.core.config import settings
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(pw: str) -> str:
    return pwd_context.hash(pw)

def verify_password(plain, hashed) -> bool:
    return pwd_context.verify(plain, hashed)

def ensure_keys_exist():
    priv = pathlib.Path(settings.jwt_private_key)
    pub = pathlib.Path(settings.jwt_public_key)
    if not priv.exists() or not pub.exists():
        # generate RSA keypair (2048)
        os.makedirs(priv.parent, exist_ok=True)
        subprocess.run(["ssh-keygen","-t","rsa","-b","2048","-m","PEM","-f", str(priv), "-N", ""], check=True)
        # ssh-keygen generates .pub in different format; convert to rsa pub
        # create public key using openssl
        subprocess.run(["openssl","rsa","-in", str(priv), "-pubout", "-out", str(pub)], check=True)

def create_access_token(subject: str, role: str = 'user', expires_minutes: int = None):
    expires = datetime.utcnow() + timedelta(minutes=expires_minutes or settings.access_token_expire_minutes)
    payload = {"sub": subject, "role": role, "exp": expires, "iat": datetime.utcnow()}
    with open(settings.jwt_private_key, 'rb') as f:
        priv = f.read()
    token = jwt.encode(payload, priv, algorithm="RS256")
    return token

def decode_token(token: str):
    with open(settings.jwt_public_key, 'rb') as f:
        pub = f.read()
    return jwt.decode(token, pub, algorithms=["RS256"])
