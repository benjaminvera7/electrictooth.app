

var user = {
    stream: [
        {
            id: '1',
            expire: '2022-02-18T01:00:00.000Z',
        },
        {
            id: '2',
            expire: '2022-02-18T02:00:00.000Z',
        },
        {
            id: '3',
            expire: '2022-02-18T03:00:00.000Z',
        },
    ]
}

function setExpiration(user, trackId) {
    let [stream] = user.stream.filter((s) => s.id === trackId);

    if (!stream) {
        stream = {
            id: null,
            expire: null,
        };
    }

    const now = '2022-02-18T02:09:45.371Z' //now

    if (now > stream.expire || stream.expire === null) {
        stream.id = trackId;

        const expiry = new Date(); //now
        expiry.setSeconds(expiry.getSeconds() + 30000); //+ 30 seconds
        stream.expire = expiry.toISOString();

        const filtered = user.stream.filter((s) => s.expire > '2022-02-18T02:09:45.371Z');

        if (filtered) {
            user.stream = [...filtered, stream];
        } else {
            user.stream = [stream];
        }
    }

    return user.stream;
}

test('adds 1 + 2 to equal 3', () => {
    const stream = setExpiration(user, '4');
    expect(stream.length).toBe(2);
});