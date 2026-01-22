# GameMaker's Data File
On Windows, it's called `data.win`. On macOS, it's called `game.ios`.
It's the same file, just with a different name.

# Endianess
I am pretty sure every number in a GameMaker data file is little-endian.

# Chunk Header
This is important because it is used for every single chunk in GameMaker.
It has 8 bytes:

```
| 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
|---|---|---|---|---|---|---|---|
| Chunk Name    | Chunk Size    |
```

The chunk name is a "string" that is four characters long.
It will always have all-caps letters or numbers in it,
like `GEN8` or `TXTR`.

The chunk size is a 4-byte (32-bit) little-endian unsigned integer
that specifies the number of bytes of the chunk that will come
AFTER the header.

# File Structure
GameMaker data files will ALWAYS start with the FORM chunk, which contains all other chunks.
This means that the file will ALWAYS start with `FORM`, followed by a 32-bit little-endian
unsigned integer specifying the filesize minus 8 bytes (because the header is 8 bytes).

# Example code to traverse through the chunks
```gml
import struct
import os

def get_chunk_info(header: bytes) -> tuple[str, int]:
    # '<' means little-endian
    # '4s' means a 4-byte string
    # 'I' means a 32-bit unsigned integer
    format = '<4sI'
    name, size = struct.unpack(format, header)
    # '.decode' converts 'name' from bytes to str
    return name.decode('utf-8'), size

with open('game.ios', 'rb') as f:
    form_name, form_size = get_chunk_info(f.read(8))
    # the first chunk is ALWAYS form
    assert form_name == 'FORM'
    print(f'FORM chunk size: {form_size} bytes')

    n_chunks = 0

    while True:
        header = f.read(8)
        if len(header) == 0:
            # we reached the end of the file
            break
        # the header is ALWAYS 8 bytes
        assert len(header) == 8

        chunk_name, chunk_size = get_chunk_info(header)
        print(f'Found chunk {chunk_name}, which is {chunk_size} bytes long')
        n_chunks += 1

        # go forward 'chunk_size' bytes
        f.seek(chunk_size, os.SEEK_CUR)
    
    print(f'Found {n_chunks} chunks.')
```

This is the output when `game.ios` is
DELTARUNE Chapter 4 for macOS's data file:
```
FORM chunk size: 131798966 bytes
Found chunk GEN8, which is 1504 bytes long
Found chunk OPTN, which is 88 bytes long
Found chunk LANG, which is 24 bytes long
Found chunk EXTN, which is 56 bytes long
Found chunk SOND, which is 23656 bytes long
Found chunk AGRP, which is 24 bytes long
Found chunk SPRT, which is 1134200 bytes long
Found chunk BGND, which is 52744 bytes long
Found chunk PATH, which is 1176 bytes long
Found chunk SCPT, which is 35032 bytes long
Found chunk GLOB, which is 3832 bytes long
Found chunk SHDR, which is 4584 bytes long
Found chunk FONT, which is 392376 bytes long
Found chunk TMLN, which is 8 bytes long
Found chunk OBJT, which is 698840 bytes long
Found chunk FEDS, which is 24 bytes long
Found chunk ACRV, which is 328 bytes long
Found chunk SEQN, which is 8 bytes long
Found chunk TAGS, which is 6296 bytes long
Found chunk ROOM, which is 13829304 bytes long
Found chunk DAFL, which is 8 bytes long
Found chunk EMBI, which is 136 bytes long
Found chunk TPAG, which is 528952 bytes long
Found chunk TGIN, which is 24456 bytes long
Found chunk CODE, which is 7807896 bytes long
Found chunk VARI, which is 635176 bytes long
Found chunk FUNC, which is 271720 bytes long
Found chunk FEAT, which is 24 bytes long
Found chunk STRG, which is 3081688 bytes long
Found chunk TXTR, which is 10218184 bytes long
Found chunk AUDO, which is 93046374 bytes long
Found 31 chunks.
```
