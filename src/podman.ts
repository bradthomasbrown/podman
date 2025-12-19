type RunOptions =
      ["add-host", string]
    | ["annotation", string]
    | ["arch", string]
    | ["attach", "stdin"|"stdout"|"stderr"]
    | ["authfile", string]
    | ["blkio-weigth", number]
    | ["blkio-weight-device", string]
    | ["cap-add", string]
    | ["cap-drop", string]
    | ["cert-dir", string]
    | ["cgroup-conf", string]
    | ["cgroup-parent", string]
    | ["cgroupns", string]
    | ["cgroups", string]
    | ["chrootdirs", string]
    | ["cidfile", string]
    | ["conmon-pidfile", string]
    | ["cpu-period", number]
    | ["cpu-quota", number]
    | ["cpu-rt-period", number]
    | ["cpu-rt-runtime", number]
    | ["cpu-shares", number]
    | ["cpus", string]
    | ["cpuset-cpus", string]
    | ["cpuset-mems", string]
    | ["creds", string]
    | ["decryption-key", string]
    | ["detach"]
    | ["detach-keys", string]
    | ["device", string]
    | ["device-cgroup-rule", string]
    | ["device-read-bps", string]
    | ["device-read-iops", string]
    | ["device-write-bps", string]
    | ["device-write-iops", string]
    | ["disable-content-trust"]
    | ["dns", string]
    | ["dns-option", string]
    | ["dns-search", string]
    | ["entrypoint", string|[string, ...string[]]]
    | ["env", string]
    | ["env-file", string]
    | ["env-host"]
    | ["env-merge", string]
    | ["expose", string]
    | ["gidmap", string]
    | ["gpus", string]
    | ["group-add", string]
    | ["group-entry", string]
    | ["health-cmd", string|[string, ...string[]]]
    | ["health-interval", string]
    | ["health-log-destination", string]
    | ["health-max-log-count", number]
    | ["health-max-log-size", number]
    | ["health-on-failure", string]
    | ["health-retries", string]
    | ["health-start-period", string]
    | ["health-startup-cmd", string|[string, ...string[]]]
    | ["health-startup-interval", string]
    | ["health-startup-retries", number]
    | ["health-startup-success", number]
    | ["health-startup-timeout", string]
    | ["health-timeout", string]
    | ["help"]
    | ["hostname", string]
    | ["hosts-file", string]
    | ["hostuser", string]
    | ["http-proxy"]
    | ["image-volume", "bind"|"tmpfs"|"ignore"]
    | ["init"]
    | ["init-path", string]
    | ["interactive"]
    | ["ip", string]
    | ["ip6", string]
    | ["ipc", string]
    | ["label", string]
    | ["label-file", string]
    | ["link-local-ip", string]
    | ["log-driver", string]
    | ["log-opt", string]
    | ["mac-address", string]
    | ["memory", string]
    | ["memory-reservation", string]
    | ["memory-swap", string]
    | ["memory-swappiness", number]
    | ["mount", string]
    | ["network", string]
    | ["network-alias", string]
    | ["no-healthcheck"]
    | ["no-hostname"]
    | ["no-hosts"]
    | ["oom-kill-disable"]
    | ["oom-score-adj", number]
    | ["os", string]
    | ["passwd"]
    | ["passwd-entry", string]
    | ["personality", string]
    | ["pid", string]
    | ["pidfile", string]
    | ["pids-limit", number]
    | ["platform", string]
    | ["pod", string]
    | ["pod-id-file", string]
    | ["preserve-fd", string]
    | ["preserve-fds", string]
    | ["privileged"]
    | ["publish", string]
    | ["publish-all"]
    | ["pull", "always"|"missing"|"never"|"newer"]
    | ["quiet"]
    | ["rdt-class", string]
    | ["read-only"]
    | ["read-only-tmpfs"]
    | ["replace"]
    | ["requires", string]
    | ["restart", string]
    | ["retry", number]
    | ["retry-delay", string]
    | ["rm"]
    | ["rmi"]
    | ["rootfs"]
    | ["sdnotify", "container"|"conmon"|"healthy"|"ignore"]
    | ["seccomp-policy", string]
    | ["secret", string]
    | ["security-opt", string]
    | ["shm-size", string]
    | ["shm-size-systemd", string]
    | ["sig-proxy"]
    | ["stop-signal", string]
    | ["stop-timeout", string]
    | ["subgidname", string]
    | ["subuidname", string]
    | ["sysctl", string]
    | ["systemd", "true"|"false"|"always"]
    | ["timeout", number]
    | ["tls-verify"]
    | ["tmpfs", string]
    | ["tty"]
    | ["tz", string]
    | ["uidmap", string]
    | ["ulimit", string]
    | ["umask", string]
    | ["unsetenv", string]
    | ["unsetenv-all"]
    | ["user", string]
    | ["userns", string]
    | ["uts", string]
    | ["variant", string]
    | ["volume", string]
    | ["volumes-from", string]
    | ["workdir", string];

const _c946a1_ = new TextDecoder();

// read a readable stream to its end, as text, return full string
async function _ec5174_(_6f_:ReadableStream<Uint8Array>) {
	let _d2_ = new ArrayBuffer(1024);
    let _90_ = 0;
	for await (const _94_ of _6f_) {
        while (_90_ + _94_.byteLength > _d2_.byteLength)
            _d2_ = _d2_.transfer(_d2_.byteLength << 1);
        new Uint8Array(_d2_).set(_94_, _90_);
        _90_ += _94_.byteLength;
    }
    _d2_ = _d2_.slice(0, _90_);
	return _c946a1_.decode(_d2_);
}

class Podman {

	static get images() {
		const _134a_ = Bun.spawn(["podman", "images", "--format", "json"]);
		return _ec5174_(_134a_.stdout).then(JSON.parse);
	}

	static get containers() {
		const _ef27_ = Bun.spawn(["podman", "container", "list", "--format", "json"]);
		return _ec5174_(_ef27_.stdout).then(JSON.parse);
	}

	static run(options:Array<RunOptions>, image:string, command:null|string) {
		const _ec_ = ["podman", "run"];
		if (options) {
            for (const option of options) {
                if (option.length == 1) _ec_.push(`--${option[0]}`);
                else _ec_.push(`--${option[0]}=${String(option[1])}`);
            }
        }
		_ec_.push(image);
        if (command) _ec_.push(command);
		const _100b_ = Bun.spawn(_ec_);
		return _ec5174_(_100b_.stdout);
	}

	static kill(id:string) {
		const _b2c4_ = Bun.spawn(["podman", "kill", id]);
		return _b2c4_.exited;
	}

}

export { Podman };