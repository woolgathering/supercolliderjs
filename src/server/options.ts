interface ScsynthArgs {
  numPrivateAudioBusChannels: number;
  /**
   *  numAudioBusChannels -  The number of internal audio rate busses. The default is 128.
   */
  numAudioBusChannels: number;
  /**
   *  numControlBusChannels - The number of internal control rate busses. The default is 4096.
   */
  numControlBusChannels: number;
  /**
   *  numInputBusChannels - The number of audio input bus channels. The default is 8.
   *  Need not correspond to the available number of hardware inputs and outputs.
   */
  numInputBusChannels: number;
  /**
   *  numOutputBusChannels - The number of audio output bus channels. The default is 8.
   *  Need not correspond to the available number of hardware inputs and outputs.
   */
  numOutputBusChannels: number;
  /**
   *  numBuffers - The number of global sample buffers available. (See Buffer.) The default is 1024.
   */
  numBuffers: number;
  /**
   * maxNodes - The maximum number of Nodes. The default is 1024.
   */
  maxNodes: number;
  /**
   *  maxSynthDefs - The maximum number of SynthDefs. The default is 1024.
   */
  maxSynthDefs: number;
  /**
   *  blockSize - The number of samples in one control period. The default is 64.
   */
  blockSize: number;
  /**
   *  memSize - The number of kilobytes of real time memory allocated to the server. This memory is used to allocate synths and any memory that unit generators themselves allocate (for instance in the case of delay ugens which do not use buffers, such as CombN), and is separate from the memory used for buffers. Setting this too low is a common cause of 'exception in real time: alloc failed' errors. The default is 8192.
   */
  hardwareBufferSize: number | null;
  /**
   *  numRGens - The number of seedable random number generators. The default is 64.
   */
  memSize: number;
  /**
   *  numRGens - The number of seedable random number generators. The default is 64.
   */
  numRGens: number;
  /**
   *  numWireBufs - The maximum number of buffers that are allocated to interconnect unit generators. (Not to be confused with the global sample buffers represented by Buffer.) This sets the limit of complexity of SynthDefs that can be loaded at runtime. This value will be automatically increased if a more complex def is loaded at startup, but it cannot be increased thereafter without rebooting. The default is 64.
   */
  numWireBufs: number;
  /**
   *  sampleRate - The preferred sample rate. If non-nil the server app will attempt to set the hardware sample rate.
   */
  sampleRate: number;
  /**
   *  loadDefs - A Boolean indicating whether or not to load the synth definitions in synthdefs/ (or anywhere set in the environment variable SC_SYNTHDEF_PATH) at startup. The default is true.
   */
  loadDefs: boolean;
  /**
   *  inputStreamsEnabled - A String which allows turning off input streams that you are not interested in on the audio device. If the string is "01100", for example, then only the second and third input streams on the device will be enabled. Turning off streams can reduce CPU load.
   */
  inputStreamsEnabled: boolean | null;
  /**
   * outputStreamsEnabled - A String  which allows turning off output streams that you are not interested in on the
   * audio device. If the string is "11000", for example, then only the first two output streams on the device will
   * be enabled. Turning off streams can reduce CPU load.
   */
  outputStreamsEnabled: boolean | null;
  device: string | null;
  verbosity: number;
  zeroConf: boolean;
  restrictedPath: string | null;
  ugenPluginsPath: string | null;
  initialNodeID: number;
  remoteControlVolume: boolean;
  memoryLocking: boolean;
  threads: boolean;
  useSystemClock: boolean;
}

export interface ServerSettings {
  host: string;
  serverPort: string;
  /**
   *  protocol - A symbol representing the communications protocol. Either  \udp or \tcp. The default is udp.
   */
  protocol: string;
  /**
   * Post internal debug logging to console.
   */
  debug: boolean;
  /**
   * Post scsynth STDOUT/STDERR to console
   */
  echo: boolean;

  log?: Console;
  /**
   * For websocket support with SC API
   * @deprecated will move elsewhere
   */
  websocketPort?: number;
  /**
   * Path to sclang executable
   * TODO should get it from sclang
   */
  sclang?: string;
  /**
   * Path to scsynth executable
   */
  scsynth?: string;
  /**
   * Path to a config file.
   */
  sclang_conf?: string;

  /**
   *  env - Environment variables that will be set for the scsynth process.
   * eg. SC_JACK_DEFAULT_INPUTS: "system:capture_1,system:capture_2"
   * SC_JACK_DEFAULT_OUTPUTS
   * SC_SYNTHDEF_PATH
   * SC_PLUGIN_PATH
   */
  env?: NodeJS.ProcessEnv;

  // ?
  cwd?: string;

  /**
   * Optional list of extra command line args to include on booting
   */
  commandLineOptions?: string[];
}

/**
 * server.options - combined settings and args for scsynth
 */
export type ServerOptions = ScsynthArgs & ServerSettings;

// All args are optional
export type ServerArgs = Partial<ScsynthArgs> & Partial<ServerSettings>;

export const defaults: ServerOptions = {
  // Server
  host: "127.0.0.1",
  serverPort: "57110",
  protocol: "udp",
  debug: false,
  echo: true,

  // scsynth
  numPrivateAudioBusChannels: 112,
  numAudioBusChannels: 128,
  numControlBusChannels: 4096,
  numInputBusChannels: 2,
  numOutputBusChannels: 2,
  numBuffers: 1026,

  maxNodes: 1024,
  maxSynthDefs: 1024,
  blockSize: 64,
  hardwareBufferSize: null,

  memSize: 8192,
  numRGens: 64,
  numWireBufs: 64,

  sampleRate: 44000,
  loadDefs: true,

  inputStreamsEnabled: null,
  outputStreamsEnabled: null,

  device: null,

  verbosity: 0,

  restrictedPath: null,
  ugenPluginsPath: null,

  initialNodeID: 1000,
  remoteControlVolume: false,

  memoryLocking: false,
  threads: false,
  useSystemClock: false,

  zeroConf: false,
};
