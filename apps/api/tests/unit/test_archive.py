import io
import zipfile
import pytest
from app.services.media.archive import create_safe_zip


def test_create_safe_zip_success():
    items = [
        ("image_1.jpg", b"fake jpeg 1 bytes"),
        ("image_2.jpg", b"fake jpeg 2 bytes"),
    ]
    zip_bytes = create_safe_zip(items)
    assert len(zip_bytes) > 0

    zf = zipfile.ZipFile(io.BytesIO(zip_bytes))
    namelist = zf.namelist()
    assert "image_1.jpg" in namelist
    assert "image_2.jpg" in namelist
    assert zf.read("image_1.jpg") == b"fake jpeg 1 bytes"


def test_create_safe_zip_sanitizes_paths():
    malicious_items = [
        ("../../etc/passwd", b"root:x:0:0"),
        ("/absolute/path/file.mp4", b"video data"),
    ]
    zip_bytes = create_safe_zip(malicious_items)
    zf = zipfile.ZipFile(io.BytesIO(zip_bytes))
    namelist = zf.namelist()
    assert "../../etc/passwd" not in namelist
    assert "/absolute/path/file.mp4" not in namelist
    assert "passwd" in namelist
    assert "file.mp4" in namelist


def test_create_safe_zip_exceeds_max_items():
    items = [(f"item_{i}.jpg", b"data") for i in range(15)]
    with pytest.raises(ValueError, match="Exceeded maximum item count"):
        create_safe_zip(items)
