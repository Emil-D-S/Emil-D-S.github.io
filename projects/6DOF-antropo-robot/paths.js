export const robotSpeed = 0.6;

export const blockPath = [
  // APPROACH above baseline (rapid)
  { pos: [-3.5, 1.2 + 1, 1.2], rotEuler: [0, 0, 0], speed: robotSpeed },

  // --- LETTER "E" (leftmost) ---
  // vertical down to baseline start
  { pos: [-3.5, 0.05 + 1, 1.2], rotEuler: [0, 0, 0], speed: robotSpeed },

  // vertical up (smooth: multiple segments)
  { pos: [-3.5, 0.3 + 1, 1.2], rotEuler: [0, 0, 0], speed: robotSpeed },
  { pos: [-3.5, 0.6 + 1, 1.2], rotEuler: [0, 0, 0], speed: robotSpeed },
  { pos: [-3.5, 0.9 + 1, 1.2], rotEuler: [0, 0, 0], speed: robotSpeed },

  // TOP horizontal out
  { pos: [-2.8, 0.9 + 1, 1.2], rotEuler: [0, 0, 0], speed: robotSpeed },
  { pos: [-2.4, 0.9 + 1, 1.2], rotEuler: [0, 0, 0], speed: robotSpeed },
  // go back the same way into the vertical (return)
  { pos: [-2.8, 0.9 + 1, 1.2], rotEuler: [0, 0, 0], speed: robotSpeed },

  // MIDDLE horizontal out
  { pos: [-2.8, 0.6 + 1, 1.2], rotEuler: [0, 0, 0], speed: robotSpeed },
  { pos: [-2.4, 0.6 + 1, 1.2], rotEuler: [0, 0, 0], speed: robotSpeed },
  // return
  { pos: [-2.8, 0.6 + 1, 1.2], rotEuler: [0, 0, 0], speed: robotSpeed },

  // BOTTOM horizontal out
  { pos: [-2.8, 0.05 + 1, 1.2], rotEuler: [0, 0, 0], speed: robotSpeed },
  { pos: [-2.4, 0.05 + 1, 1.2], rotEuler: [0, 0, 0], speed: robotSpeed },
  // return into vertical to finish E
  {
    pos: [-3.5, 0.05 + 1, 1.2],
    rotEuler: [0, 0, 0],
    speed: robotSpeed,
    hold: 0.08,
  },

  // Move (lift) to start "M"
  { pos: [-2.0, 1.4 + 1, 1.35], rotEuler: [0, 0, 0], speed: robotSpeed },

  // --- LETTER "M" (block style, three humps) ---
  { pos: [-1.9, 0.05 + 1, 1.35], rotEuler: [0, 0, 0], speed: robotSpeed },
  { pos: [-1.85, 0.45 + 1, 1.35], rotEuler: [0, 0, 0], speed: robotSpeed },
  { pos: [-1.7, 0.05 + 1, 1.35], rotEuler: [0, 0, 0], speed: robotSpeed },

  { pos: [-1.55, 0.5 + 1, 1.35], rotEuler: [0, 0, 0], speed: robotSpeed },
  { pos: [-1.4, 0.05 + 1, 1.35], rotEuler: [0, 0, 0], speed: robotSpeed },

  { pos: [-1.25, 0.45 + 1, 1.35], rotEuler: [0, 0, 0], speed: robotSpeed },
  {
    pos: [-1.1, 0.05 + 1, 1.35],
    rotEuler: [0, 0, 0],
    speed: robotSpeed,
    hold: 0.04,
  },

  // SHIFT to "I"
  { pos: [-0.5, 1.4 + 1, 1.4], rotEuler: [0, 0, 0], speed: robotSpeed },

  // --- LETTER "I" ---
  { pos: [-0.5, 0.05 + 1, 1.4], rotEuler: [0, 0, 0], speed: robotSpeed },
  { pos: [-0.5, 0.7 + 1, 1.4], rotEuler: [0, 0, 0], speed: robotSpeed },
  // dot
  {
    pos: [-0.5, 1.05 + 1, 1.4],
    rotEuler: [0, 0, 0],
    speed: robotSpeed,
    hold: 0.06,
  },

  // SHIFT to "L"
  { pos: [0.1, 1.6 + 1, 1.5], rotEuler: [0, 0, 0], speed: robotSpeed },

  // --- LETTER "L" ---
  { pos: [0.1, 0.05 + 1, 1.5], rotEuler: [0, 0, 0], speed: robotSpeed },
  { pos: [0.1, 1.3 + 1, 1.5], rotEuler: [0, 0, 0], speed: robotSpeed },
  // back down and baseline
  { pos: [0.1, 0.05 + 1, 1.5], rotEuler: [0, 0, 0], speed: robotSpeed },

  // SHIFT to "D" start
  { pos: [0.9, 1.4 + 1, 1.55], rotEuler: [0, 0, 0], speed: robotSpeed },

  // --- LETTER "D" (capital) ---
  // spine
  { pos: [0.9, 0.05 + 1, 1.55], rotEuler: [0, 0, 0], speed: robotSpeed },
  { pos: [0.9, 1.3 + 1, 1.55], rotEuler: [0, 0, 0], speed: robotSpeed },
  // curved arc (multiple segments out and back to make smooth)
  { pos: [1.3, 1.2 + 1, 1.55], rotEuler: [0, 0, 0], speed: robotSpeed },
  { pos: [1.6, 1.0 + 1, 1.55], rotEuler: [0, 0, 0], speed: robotSpeed },
  { pos: [1.7, 0.7 + 1, 1.55], rotEuler: [0, 0, 0], speed: robotSpeed },
  { pos: [1.6, 0.35 + 1, 1.55], rotEuler: [0, 0, 0], speed: robotSpeed },
  // return to spine bottom
  {
    pos: [0.95, 0.05 + 1, 1.55],
    rotEuler: [0, 0, 0],
    speed: robotSpeed,
    hold: 0.04,
  },

  // SHIFT to "S" start (to the right)
  { pos: [2.0, 1.6 + 1, 1.8], rotEuler: [0, 0, 0], speed: robotSpeed },

  // --- LETTER "S" (approx with many segments, top-to-bottom then curl back) ---
  { pos: [2.0, 1.15 + 1, 1.8], rotEuler: [0, 0, 0], speed: robotSpeed },
  { pos: [2.25, 1.0 + 1, 1.8], rotEuler: [0, 0, 0], speed: robotSpeed },
  { pos: [2.5, 0.85 + 1, 1.8], rotEuler: [0, 0, 0], speed: robotSpeed },

  { pos: [2.25, 0.6 + 1, 1.8], rotEuler: [0, 0, 0], speed: robotSpeed },
  { pos: [2.0, 0.45 + 1, 1.8], rotEuler: [0, 0, 0], speed: robotSpeed },

  { pos: [2.3, 0.25 + 1, 1.8], rotEuler: [0, 0, 0], speed: robotSpeed },
  {
    pos: [2.05, 0.05 + 1, 1.8],
    rotEuler: [0, 0, 0],
    speed: robotSpeed,
    hold: 0.08,
  },

  // retract / end
  { pos: [1.2, 2.0 + 1, 1.3], rotEuler: [0, 0, 0], speed: robotSpeed },
  { pos: [0.0, 2.0 + 1, 1.0], rotEuler: [0, 0, 0], speed: robotSpeed },
];

// Cursive single-stroke version: smoother, many small segments, one continuous stroke passing through the letters.
// All y uplifted by +1 and rotEuler [0,0,0], speed robotSpeed.
export const cursivePath = [
  { pos: [-3.5, 1.2 + 1, 1.2], rotEuler: [0, 0, 0], speed: robotSpeed }, // approach
  // E (drawn in a flowing stroke, bottom to top, sweep across, back)
  { pos: [-3.5, 0.05 + 1, 1.2], rotEuler: [0, 0, 0], speed: robotSpeed },
  { pos: [-3.45, 0.18 + 1, 1.2], rotEuler: [0, 0, 0], speed: robotSpeed },
  { pos: [-3.4, 0.32 + 1, 1.2], rotEuler: [0, 0, 0], speed: robotSpeed },
  { pos: [-3.35, 0.48 + 1, 1.2], rotEuler: [0, 0, 0], speed: robotSpeed },
  { pos: [-3.25, 0.64 + 1, 1.2], rotEuler: [0, 0, 0], speed: robotSpeed },

  { pos: [-3.0, 0.8 + 1, 1.2], rotEuler: [0, 0, 0], speed: robotSpeed },
  { pos: [-2.7, 0.9 + 1, 1.2], rotEuler: [0, 0, 0], speed: robotSpeed },

  // sweep back into middle arm
  { pos: [-3.05, 0.68 + 1, 1.2], rotEuler: [0, 0, 0], speed: robotSpeed },
  { pos: [-2.8, 0.6 + 1, 1.2], rotEuler: [0, 0, 0], speed: robotSpeed },

  // bottom arm
  { pos: [-3.2, 0.25 + 1, 1.2], rotEuler: [0, 0, 0], speed: robotSpeed },
  { pos: [-2.6, 0.12 + 1, 1.2], rotEuler: [0, 0, 0], speed: robotSpeed },

  // flow to M
  { pos: [-2.0, 0.9 + 1, 1.3], rotEuler: [0, 0, 0], speed: robotSpeed },
  { pos: [-1.9, 0.3 + 1, 1.35], rotEuler: [0, 0, 0], speed: robotSpeed },
  { pos: [-1.7, 0.85 + 1, 1.35], rotEuler: [0, 0, 0], speed: robotSpeed },
  { pos: [-1.55, 0.25 + 1, 1.35], rotEuler: [0, 0, 0], speed: robotSpeed },
  { pos: [-1.35, 0.9 + 1, 1.35], rotEuler: [0, 0, 0], speed: robotSpeed },
  { pos: [-1.05, 0.2 + 1, 1.35], rotEuler: [0, 0, 0], speed: robotSpeed },

  // flow to I
  { pos: [-0.6, 0.9 + 1, 1.4], rotEuler: [0, 0, 0], speed: robotSpeed },
  { pos: [-0.5, 0.05 + 1, 1.4], rotEuler: [0, 0, 0], speed: robotSpeed },
  { pos: [-0.5, 0.7 + 1, 1.4], rotEuler: [0, 0, 0], speed: robotSpeed },
  { pos: [-0.5, 1.1 + 1, 1.4], rotEuler: [0, 0, 0], speed: robotSpeed },

  // flow to L
  { pos: [0.0, 1.2 + 1, 1.45], rotEuler: [0, 0, 0], speed: robotSpeed },
  { pos: [0.05, 0.1 + 1, 1.45], rotEuler: [0, 0, 0], speed: robotSpeed },
  { pos: [0.05, 1.25 + 1, 1.45], rotEuler: [0, 0, 0], speed: robotSpeed },

  // flow to D
  { pos: [0.6, 1.4 + 1, 1.55], rotEuler: [0, 0, 0], speed: robotSpeed },
  { pos: [0.9, 0.08 + 1, 1.55], rotEuler: [0, 0, 0], speed: robotSpeed },
  { pos: [0.95, 1.1 + 1, 1.55], rotEuler: [0, 0, 0], speed: robotSpeed },
  { pos: [1.25, 0.9 + 1, 1.55], rotEuler: [0, 0, 0], speed: robotSpeed },
  { pos: [1.55, 0.6 + 1, 1.55], rotEuler: [0, 0, 0], speed: robotSpeed },
  { pos: [1.1, 0.08 + 1, 1.55], rotEuler: [0, 0, 0], speed: robotSpeed },

  // flow to S (final)
  { pos: [1.6, 1.3 + 1, 1.8], rotEuler: [0, 0, 0], speed: robotSpeed },
  { pos: [2.0, 1.0 + 1, 1.8], rotEuler: [0, 0, 0], speed: robotSpeed },
  { pos: [2.35, 0.7 + 1, 1.8], rotEuler: [0, 0, 0], speed: robotSpeed },
  { pos: [2.05, 0.45 + 1, 1.8], rotEuler: [0, 0, 0], speed: robotSpeed },
  { pos: [2.4, 0.2 + 1, 1.8], rotEuler: [0, 0, 0], speed: robotSpeed },

  // finish & retract
  { pos: [1.4, 2.0 + 1, 1.3], rotEuler: [0, 0, 0], speed: robotSpeed },
  { pos: [0.0, 2.0 + 1, 1.0], rotEuler: [0, 0, 0], speed: robotSpeed },
];

export let robotPath = [
  { pos: [-3.5, 0.5, -3.5], rotEuler: [0, 0, 0], speed: robotSpeed, hold: 0.2 },
  { pos: [-2, 1, -3], rotEuler: [0, 0, 0], speed: robotSpeed },
  { pos: [-1, 2, -2.5], rotEuler: [0, 0, 0], speed: robotSpeed },
  { pos: [-3, 2.5, -1], rotEuler: [0, 0, 0], speed: robotSpeed },
  { pos: [-3.5, 3, 1], rotEuler: [0, 0, 0], speed: robotSpeed },
  { pos: [-2, 3.5, 2], rotEuler: [0, 0, 0], speed: robotSpeed },
  { pos: [-1, 4, 3], rotEuler: [0, 0, 0], speed: robotSpeed },
  { pos: [-2.5, 3.5, 3.5], rotEuler: [0, 0, 0], speed: robotSpeed },
  { pos: [-3.5, 3, 2.5], rotEuler: [0, 0, 0], speed: robotSpeed, hold: 0.5 },

  { pos: [3.5, 0.5, 3.5], rotEuler: [0, 0, 0], speed: robotSpeed },
  { pos: [2, 1, 3], rotEuler: [0, 0, 0], speed: robotSpeed },
  { pos: [1, 2, 2.5], rotEuler: [0, 0, 0], speed: robotSpeed },
  { pos: [3, 2.5, 1], rotEuler: [0, 0, 0], speed: robotSpeed },
  { pos: [3.5, 3, -1], rotEuler: [0, 0, 0], speed: robotSpeed },
  { pos: [2, 3.5, -2], rotEuler: [0, 0, 0], speed: robotSpeed },
  { pos: [1, 4, -3], rotEuler: [0, 0, 0], speed: robotSpeed },
  { pos: [2.5, 3.5, -3.5], rotEuler: [0, 0, 0], speed: robotSpeed },
  { pos: [3.5, 3, -2.5], rotEuler: [0, 0, 0], speed: robotSpeed, hold: 0.5 },
];

export const basePathPositions = [
  [-2.5, 0.5, -2.5], // start
  [-2.5, 2.5, -2.5], // move up
  [-2.0, 2.5, -2.0], // over object
  [-2.0, 0.5, -2.0], // lower to pick
  [-2.0, 0.5, -2.0], // pick hold
  [-2.0, 2.5, -2.0], // lift
  [2.0, 2.5, -2.0], // move to place
  [2.5, 2.5, -2.5], // over place
  [2.5, 0.5, -2.5], // lower to place
  [2.5, 0.5, -2.5], // place hold
  [2.5, 2.5, -2.5], // retract
  [2.0, 2.5, -2.0],
  [0, 2.5, 3.0],
  [-2.5, 2.5, 2.5],
  [-3, 2.5, 3],
];

export const emilPath = [
  {
    pos: [-3.0000000000000004, 1, 1.9154979679792396],
    rotEuler: [0, 0, 0],
    speed: robotSpeed,
  },
  {
    pos: [-2.8497536632420057, 1, 1.8829805785854795],
    rotEuler: [0, 0, 0],
    speed: robotSpeed,
  },
  {
    pos: [-2.699507326484011, 1, 1.8504631891917195],
    rotEuler: [0, 0, 0],
    speed: robotSpeed,
  },
  {
    pos: [-2.5492609897260162, 1, 1.8179457997979594],
    rotEuler: [0, 0, 0],
    speed: robotSpeed,
  },
  {
    pos: [-2.3990146529680214, 1, 1.7854284104041993],
    rotEuler: [0, 0, 0],
    speed: robotSpeed,
  },
  {
    pos: [-2.2487683162100266, 1, 1.7529110210104393],
    rotEuler: [0, 0, 0],
    speed: robotSpeed,
  },
  {
    pos: [-2.098521979452032, 1, 1.7203936316166792],
    rotEuler: [0, 0, 0],
    speed: robotSpeed,
  },
  {
    pos: [-1.9482756426940372, 1, 1.6878762422229191],
    rotEuler: [0, 0, 0],
    speed: robotSpeed,
  },
  {
    pos: [-1.7980293059360424, 1, 1.655358852829159],
    rotEuler: [0, 0, 0],
    speed: robotSpeed,
  },
  {
    pos: [-1.6477829691780476, 1, 1.622841463435399],
    rotEuler: [0, 0, 0],
    speed: robotSpeed,
  },
  {
    pos: [-1.4975366324200528, 1, 1.590324074041639],
    rotEuler: [0, 0, 0],
    speed: robotSpeed,
  },
  {
    pos: [-1.347290295662058, 1, 1.5578066846478788],
    rotEuler: [0, 0, 0],
    speed: robotSpeed,
  },
  {
    pos: [-1.1970439589040634, 1, 1.5252892952541187],
    rotEuler: [0, 0, 0],
    speed: robotSpeed,
  },
  {
    pos: [-1.0467976221460686, 1, 1.4927719058603586],
    rotEuler: [0, 0, 0],
    speed: robotSpeed,
  },
  {
    pos: [-0.8965512853880737, 1, 1.4602545164665985],
    rotEuler: [0, 0, 0],
    speed: robotSpeed,
  },
  {
    pos: [-0.7463049486300789, 1, 1.4277371270728385],
    rotEuler: [0, 0, 0],
    speed: robotSpeed,
  },
  {
    pos: [-0.5960586118720841, 1, 1.3952197376790784],
    rotEuler: [0, 0, 0],
    speed: robotSpeed,
  },
  {
    pos: [-0.44581227511408934, 1, 1.3627023482853183],
    rotEuler: [0, 0, 0],
    speed: robotSpeed,
  },
  {
    pos: [-0.2955659383560946, 1, 1.3301849588915582],
    rotEuler: [0, 0, 0],
    speed: robotSpeed,
  },
  {
    pos: [-0.14531960159809983, 1, 1.2976675694977982],
    rotEuler: [0, 0, 0],
    speed: robotSpeed,
  },
  {
    pos: [0.004926735159894912, 1, 1.265150180104038],
    rotEuler: [0, 0, 0],
    speed: robotSpeed,
  },
  {
    pos: [0.15517307191788968, 1, 1.232632790710278],
    rotEuler: [0, 0, 0],
    speed: robotSpeed,
  },
  {
    pos: [0.30541940867588445, 1, 1.200115401316518],
    rotEuler: [0, 0, 0],
    speed: robotSpeed,
  },
  {
    pos: [0.4556657454338792, 1, 1.1675980119227579],
    rotEuler: [0, 0, 0],
    speed: robotSpeed,
  },
  {
    pos: [0.6059120821918739, 1, 1.1350806225289978],
    rotEuler: [0, 0, 0],
    speed: robotSpeed,
  },
  {
    pos: [0.7561584189498686, 1, 1.1025632331352377],
    rotEuler: [0, 0, 0],
    speed: robotSpeed,
  },
  {
    pos: [0.9064047557078633, 1, 1.0700458437414776],
    rotEuler: [0, 0, 0],
    speed: robotSpeed,
  },
  {
    pos: [1.056651092465858, 1, 1.0375284543477176],
    rotEuler: [0, 0, 0],
    speed: robotSpeed,
  },
  {
    pos: [1.2068974292238526, 1, 1.0050110649539575],
    rotEuler: [0, 0, 0],
    speed: robotSpeed,
  },
  {
    pos: [1.3571437659818473, 1, 0.9724936755601974],
    rotEuler: [0, 0, 0],
    speed: robotSpeed,
  },
  {
    pos: [1.507390102739842, 1, 0.9399762861664373],
    rotEuler: [0, 0, 0],
    speed: robotSpeed,
  },
  {
    pos: [1.6576364394978368, 1, 0.9074588967726773],
    rotEuler: [0, 0, 0],
    speed: robotSpeed,
  },
  {
    pos: [1.8078827762558316, 1, 0.8749415073789172],
    rotEuler: [0, 0, 0],
    speed: robotSpeed,
  },
  {
    pos: [1.9581291130138264, 1, 0.8424241179851571],
    rotEuler: [0, 0, 0],
    speed: robotSpeed,
  },
  {
    pos: [2.108375449771821, 1, 0.809906728591397],
    rotEuler: [0, 0, 0],
    speed: robotSpeed,
  },
  {
    pos: [2.2586217865298156, 1, 0.777389339197637],
    rotEuler: [0, 0, 0],
    speed: robotSpeed,
  },
  {
    pos: [2.40886812328781, 1, 0.7448719498038769],
    rotEuler: [0, 0, 0],
    speed: robotSpeed,
  },
  {
    pos: [2.5591144600458046, 1, 0.7123545604101168],
    rotEuler: [0, 0, 0],
    speed: robotSpeed,
  },
  {
    pos: [2.7093607968037994, 1, 0.6798371710163568],
    rotEuler: [0, 0, 0],
    speed: robotSpeed,
  },
  {
    pos: [2.859607133561794, 1, 0.6473197816225967],
    rotEuler: [0, 0, 0],
    speed: robotSpeed,
  },
  {
    pos: [3.0098534703197886, 1, 0.6148023922288366],
    rotEuler: [0, 0, 0],
    speed: robotSpeed,
  },
  {
    pos: [2.8776975476054046, 1, 0.594475547946434],
    rotEuler: [0, 0, 0],
    speed: robotSpeed,
  },
  {
    pos: [2.7358388024337525, 1, 0.5759068851709716],
    rotEuler: [0, 0, 0],
    speed: robotSpeed,
  },
  {
    pos: [2.6031740572611805, 1, 0.5601522261916137],
    rotEuler: [0, 0, 0],
    speed: robotSpeed,
  },
  {
    pos: [2.4772791506442403, 1, 0.5475284044823485],
    rotEuler: [0, 0, 0],
    speed: robotSpeed,
  },
  {
    pos: [2.3591055682682547, 1, 0.5382665570268244],
    rotEuler: [0, 0, 0],
    speed: robotSpeed,
  },
  {
    pos: [2.249235918989947, 1, 0.5325928085225654],
    rotEuler: [0, 0, 0],
    speed: robotSpeed,
  },
  {
    pos: [2.147962063675208, 1, 0.5307163031211126],
    rotEuler: [0, 0, 0],
    speed: robotSpeed,
  },
  {
    pos: [2.055372605201777, 1, 0.5328381969254588],
    rotEuler: [0, 0, 0],
    speed: robotSpeed,
  },
  {
    pos: [1.9713558220360316, 1, 0.5391337604660998],
    rotEuler: [0, 0, 0],
    speed: robotSpeed,
  },
  {
    pos: [1.8956718756813057, 1, 0.5497678876667017],
    rotEuler: [0, 0, 0],
    speed: robotSpeed,
  },
  {
    pos: [1.8279926871968234, 1, 0.5650120094609406],
    rotEuler: [0, 0, 0],
    speed: robotSpeed,
  },
  {
    pos: [1.7679995157669185, 1, 0.5851563998933237],
    rotEuler: [0, 0, 0],
    speed: robotSpeed,
  },
  {
    pos: [1.7152712173699857, 1, 0.6105014290818039],
    rotEuler: [0, 0, 0],
    speed: robotSpeed,
  },
  {
    pos: [1.669340020197043, 1, 0.6413568706176708],
    rotEuler: [0, 0, 0],
    speed: robotSpeed,
  },
  {
    pos: [1.6296993106523346, 1, 0.6780406574962585],
    rotEuler: [0, 0, 0],
    speed: robotSpeed,
  },
  {
    pos: [1.5958204109033273, 1, 0.7208827225799342],
    rotEuler: [0, 0, 0],
    speed: robotSpeed,
  },
  {
    pos: [1.5671573070232257, 1, 0.7702140856652562],
    rotEuler: [0, 0, 0],
    speed: robotSpeed,
  },
  {
    pos: [1.5431537361328003, 1, 0.8263728400863221],
    rotEuler: [0, 0, 0],
    speed: robotSpeed,
  },
  {
    pos: [1.52321419957575, 1, 0.8897021789883409],
    rotEuler: [0, 0, 0],
    speed: robotSpeed,
  },
  {
    pos: [1.5067199018609222, 1, 0.9605503142088262],
    rotEuler: [0, 0, 0],
    speed: robotSpeed,
  },
  {
    pos: [1.478624838762914, 1, 1.0174831975560425],
    rotEuler: [0, 0, 0],
    speed: robotSpeed,
  },
  {
    pos: [1.4569890575731233, 1, 1.0828825982004414],
    rotEuler: [0, 0, 0],
    speed: robotSpeed,
  },
  {
    pos: [1.4410196625580712, 1, 1.1564338482285925],
    rotEuler: [0, 0, 0],
    speed: robotSpeed,
  },
  {
    pos: [1.4300100240512094, 1, 1.2386891566850418],
    rotEuler: [0, 0, 0],
    speed: robotSpeed,
  },
  {
    pos: [1.4234251591825398, 1, 1.3301451366088746],
    rotEuler: [0, 0, 0],
    speed: robotSpeed,
  },
  {
    pos: [1.4208121582847683, 1, 1.4313310780291798],
    rotEuler: [0, 0, 0],
    speed: robotSpeed,
  },
  {
    pos: [1.4217449790179904, 1, 1.5437853399760394],
    rotEuler: [0, 0, 0],
    speed: robotSpeed,
  },
  {
    pos: [1.4258314873311727, 1, 1.6690887944422515],
    rotEuler: [0, 0, 0],
    speed: robotSpeed,
  },
  {
    pos: [1.4326723350106535, 1, 1.8086043734299187],
    rotEuler: [0, 0, 0],
    speed: robotSpeed,
  },
  {
    pos: [1.4418689386994085, 1, 1.9636964122563564],
    rotEuler: [0, 0, 0],
    speed: robotSpeed,
  },
  // ... (truncated for brevity — original contains many more sampled vertices)
];

/**
 * Convert G-code text to robot path with scaling and positioning
 * @param {string} gcode - G-code text content
 * @param {Object} options - Configuration options
 * @param {Array} options.position - [x, y, z] center position for the text
 * @param {Array} options.rotation - [rx, ry, rz] rotation in radians (applied around center)
 * @param {number} options.width - Target width (if provided without height, maintains aspect ratio)
 * @param {number} options.height - Target height (if provided without width, maintains aspect ratio)
 * @param {number} options.penDownZ - Z height when drawing (default: position[2])
 * @param {number} options.penUpZ - Z height when traveling (default: position[2] + 1.0)
 * @param {number} options.drawSpeed - Speed for drawing moves (default: 1.5)
 * @param {number} options.travelSpeed - Speed for rapid moves (default: 2.0)
 * @returns {Array} Path array in the format [{pos, rotEuler, speed}, ...]
 */
function gcodeToPath(gcode, options = {}) {
  const {
    position = [0, 0, 1.5],
    rotation = [0, 0, 0],
    width = null,
    height = null,
    penDownZ = position[2],
    penUpZ = position[2] + 1.0,
    drawSpeed = 1.5,
    travelSpeed = 2.0,
  } = options;

  // Parse G-code and extract coordinates
  const lines = gcode.trim().split("\n");
  const moves = [];
  let currentX = 0,
    currentY = 0;
  let isPenDown = false;

  for (const line of lines) {
    const trimmed = line.trim();

    // Check for pen down/up commands (M1002/M08 style)
    if (trimmed === "M1002") {
      isPenDown = true;
      continue;
    }
    if (trimmed === "M08") {
      isPenDown = false;
      continue;
    }

    // Parse G00 (rapid move = pen up) or G01 (linear move = pen down)
    if (trimmed.startsWith("G00") || trimmed.startsWith("G0 ")) {
      isPenDown = false; // G0 means pen up
      const xMatch = trimmed.match(/X([-\d.]+)/);
      const yMatch = trimmed.match(/Y([-\d.]+)/);

      if (xMatch) currentX = parseFloat(xMatch[1]);
      if (yMatch) currentY = parseFloat(yMatch[1]);

      if (xMatch || yMatch) {
        moves.push({
          x: currentX,
          y: currentY,
          penDown: false,
          isRapid: true,
        });
      }
    } else if (trimmed.startsWith("G01") || trimmed.startsWith("G1 ")) {
      isPenDown = true; // G1 means pen down
      const xMatch = trimmed.match(/X([-\d.]+)/);
      const yMatch = trimmed.match(/Y([-\d.]+)/);

      if (xMatch) currentX = parseFloat(xMatch[1]);
      if (yMatch) currentY = parseFloat(yMatch[1]);

      if (xMatch || yMatch) {
        moves.push({
          x: currentX,
          y: currentY,
          penDown: true,
          isRapid: false,
        });
      }
    }
  }

  if (moves.length === 0) {
    console.warn("No valid moves found in G-code");
    return [];
  }

  // Calculate bounding box
  const xs = moves.map((m) => m.x);
  const ys = moves.map((m) => m.y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);

  const originalWidth = maxX - minX;
  const originalHeight = maxY - minY;
  const centerX = (minX + maxX) / 2;
  const centerY = (minY + maxY) / 2;

  console.log(
    `Original bounds: ${originalWidth.toFixed(2)} x ${originalHeight.toFixed(
      2
    )}`
  );

  // Calculate scale factors
  let scaleX, scaleY;

  if (width && height) {
    // Both specified: stretch to fit
    scaleX = width / originalWidth;
    scaleY = height / originalHeight;
  } else if (width) {
    // Only width specified: maintain aspect ratio
    const scale = width / originalWidth;
    scaleX = scale;
    scaleY = scale;
  } else if (height) {
    // Only height specified: maintain aspect ratio
    const scale = height / originalHeight;
    scaleX = scale;
    scaleY = scale;
  } else {
    // Neither specified: use original size
    scaleX = 1;
    scaleY = 1;
  }

  // Helper function to apply rotation around origin
  function rotatePoint(x, y, z, rx, ry, rz) {
    // Apply Z rotation (yaw)
    let x1 = x * Math.cos(rz) - y * Math.sin(rz);
    let y1 = x * Math.sin(rz) + y * Math.cos(rz);
    let z1 = z;

    // Apply Y rotation (pitch)
    let x2 = x1 * Math.cos(ry) + z1 * Math.sin(ry);
    let y2 = y1;
    let z2 = -x1 * Math.sin(ry) + z1 * Math.cos(ry);

    // Apply X rotation (roll)
    let x3 = x2;
    let y3 = y2 * Math.cos(rx) - z2 * Math.sin(rx);
    let z3 = y2 * Math.sin(rx) + z2 * Math.cos(rx);

    return [x3, y3, z3];
  }

  // Convert moves to path
  const path = [];
  let lastPenState = null;

  for (let i = 0; i < moves.length; i++) {
    const move = moves[i];

    // Transform coordinates: center, scale, rotate, translate
    let x = (move.x - centerX) * scaleX;
    let y = (move.y - centerY) * scaleY;
    let z = move.penDown ? penDownZ : penUpZ;

    // Apply rotation around center
    const [xRot, yRot, zRot] = rotatePoint(
      x,
      y,
      z - position[2],
      rotation[0],
      rotation[1],
      rotation[2]
    );

    // Apply final translation
    const finalX = xRot + position[0];
    const finalY = yRot + position[1];
    const finalZ = zRot + position[2];

    // Add pen up/down transitions
    if (lastPenState !== null && lastPenState !== move.penDown) {
      // Add intermediate point for pen state change
      const prevMove = moves[i - 1];
      let prevX = (prevMove.x - centerX) * scaleX;
      let prevY = (prevMove.y - centerY) * scaleY;
      const [prevXRot, prevYRot, prevZRot] = rotatePoint(
        prevX,
        prevY,
        (move.penDown ? penUpZ : penDownZ) - position[2],
        rotation[0],
        rotation[1],
        rotation[2]
      );

      path.push({
        pos: [
          prevXRot + position[0],
          prevYRot + position[1],
          prevZRot + position[2],
        ],
        rotEuler: rotation.slice(),
        speed: travelSpeed,
      });
    }

    path.push({
      pos: [finalX, finalY, finalZ],
      rotEuler: rotation.slice(),
      speed: move.penDown ? drawSpeed : travelSpeed,
    });

    lastPenState = move.penDown;
  }

  // Add approach and return home positions
  const approachPos = [position[0], position[1], penUpZ + 1.0];
  path.unshift({
    pos: approachPos,
    rotEuler: rotation.slice(),
    speed: travelSpeed,
  });

  path.push({
    pos: approachPos,
    rotEuler: rotation.slice(),
    speed: travelSpeed,
  });

  console.log(`Converted G-code to path with ${path.length} points.`);

  return path;
}

//#region Example G-code and usage
const gcodeText = `
G21
G90
G00 X13.97498 Y19.67636
M1002
G01 X13.97498 Y17.40521
G01 X2.568445 Y17.40521
G01 X2.568445 Y11.45922
G01 X13.2449 Y11.45922
G01 X13.2449 Y9.18807
G01 X2.568445 Y9.18807
G01 X2.568445 Y2.592906
G01 X14.4341 Y2.592906
G01 X14.4341 Y0.323643
G01 X0 Y0.323643
G01 X0 Y19.67636
G01 X13.97498 Y19.67636
M08
G00 X36.29881 Y13.49327
M1002
G01 X36.92539 Y12.58632
G01 X37.29984 Y11.40088
G01 X37.42591 Y9.938847
G01 X37.42591 Y0.323643
G01 X35.04751 Y0.323643
G01 X35.04751 Y9.150437
G01 X35.02117 Y10.01223
G01 X34.94402 Y10.69527
G01 X34.81419 Y11.20143
G01 X34.6185 Y11.59281
G01 X34.33813 Y11.92963
G01 X33.97309 Y12.21187
G01 X33.54408 Y12.4245
G01 X33.06802 Y12.55057
G01 X32.54305 Y12.59385
G01 X31.60975 Y12.48471
G01 X30.78935 Y12.15731
G01 X30.07997 Y11.61163
G01 X29.53617 Y10.8251
G01 X29.20877 Y9.775145
G01 X29.09963 Y8.463637
G01 X29.09963 Y0.323643
G01 X26.72124 Y0.323643
G01 X26.72124 Y9.427039
G01 X26.65726 Y10.39421
G01 X26.46345 Y11.18638
G01 X26.14169 Y11.80167
G01 X25.67316 Y12.24198
G01 X25.03905 Y12.50541
G01 X24.24311 Y12.59385
G01 X23.59206 Y12.53552
G01 X22.97488 Y12.35864
G01 X22.38969 Y12.06699
G01 X21.876 Y11.66055
G01 X21.46392 Y11.14498
G01 X21.15721 Y10.52216
G01 X20.94459 Y9.745037
G01 X20.81852 Y8.768464
G01 X20.77524 Y7.592436
G01 X20.77524 Y0.323643
G01 X18.39684 Y0.323643
G01 X18.39684 Y14.3513
G01 X20.53251 Y14.3513
G01 X20.53251 Y12.36993
G01 X21.01985 Y13.00969
G01 X21.60316 Y13.56101
G01 X22.28432 Y14.02202
G01 X23.04827 Y14.37012
G01 X23.87807 Y14.57898
G01 X24.77561 Y14.6486
G01 X25.75031 Y14.5771
G01 X26.60081 Y14.36071
G01 X27.32713 Y14.0032
G01 X27.92549 Y13.51585
G01 X28.39214 Y12.91373
G01 X28.73083 Y12.1987
G01 X29.95578 Y13.55913
G01 X31.40465 Y14.37576
G01 X33.07743 Y14.6486
G01 X34.36636 Y14.52065
G01 X35.44078 Y14.13491
G01 X36.29881 Y13.49327
M08
G00 X44.1923 Y19.67636
M1002
G01 X44.1923 Y16.97243
G01 X41.8139 Y16.97243
G01 X41.8139 Y19.67636
G01 X44.1923 Y19.67636
M08
G00 X44.1923 Y14.3513
M1002
G01 X44.1923 Y0.323643
G01 X41.8139 Y0.323643
G01 X41.8139 Y14.3513
G01 X44.1923 Y14.3513
M08
G00 X50.37915 Y19.67636
M1002
G01 X50.37915 Y0.323643
G01 X48.00076 Y0.323643
G01 X48.00076 Y19.67636
G01 X50.37915 Y19.67636
M08
G00 X74.05401 Y15.78888
M1002
G01 X73.24679 Y16.51896
G01 X72.34547 Y17.00818
G01 X71.52132 Y17.22834
G01 X70.41679 Y17.36193
G01 X69.03566 Y17.40521
G01 X64.97507 Y17.40521
G01 X64.97507 Y2.592906
G01 X69.10152 Y2.592906
G01 X70.28508 Y2.632421
G01 X71.28423 Y2.750964
G01 X72.10086 Y2.950419
G01 X72.77825 Y3.221376
G01 X73.35592 Y3.556309
G01 X73.83573 Y3.955217
G01 X74.39647 Y4.632609
G01 X74.86876 Y5.451125
G01 X75.25262 Y6.408881
G01 X75.53486 Y7.507762
G01 X75.70422 Y8.753411
G01 X75.76066 Y10.14395
G01 X75.64964 Y12.01618
G01 X75.31847 Y13.57418
G01 X74.76527 Y14.81983
G01 X74.05401 Y15.78888
M08
G00 X76.29504 Y17.07028
M1002
G01 X77.05711 Y15.96764
G01 X77.64983 Y14.70505
G01 X78.07132 Y13.29946
G01 X78.32534 Y11.76592
G01 X78.40813 Y10.10443
G01 X78.35168 Y8.691317
G01 X78.18046 Y7.387337
G01 X77.89445 Y6.196256
G01 X77.51812 Y5.127481
G01 X77.07781 Y4.186659
G01 X76.57353 Y3.379434
G01 X76.02033 Y2.686989
G01 X75.43326 Y2.101797
G01 X74.81043 Y1.623859
G01 X74.12927 Y1.230596
G01 X73.35969 Y0.906953
G01 X72.50166 Y0.652931
G01 X71.55331 Y0.46853
G01 X70.5184 Y0.359394
G01 X69.3913 Y0.323643
G01 X62.4085 Y0.323643
G01 X62.4085 Y19.67636
G01 X69.07518 Y19.67636
G01 X70.46195 Y19.64437
G01 X71.60976 Y19.55217
G01 X72.52047 Y19.39787
G01 X73.57607 Y19.07423
G01 X74.52254 Y18.61135
G01 X75.35987 Y18.01298
G01 X76.29504 Y17.07028
M08
G00 X102.8676 Y18.09201
M1002
G01 X103.5413 Y17.26597
G01 X104.0399 Y16.32891
G01 X104.3579 Y15.31094
G01 X104.4915 Y14.21583
G01 X102.0322 Y14.02578
G01 X101.7951 Y15.14724
G01 X101.3491 Y16.07113
G01 X100.6925 Y16.79368
G01 X99.80996 Y17.31301
G01 X98.68473 Y17.62536
G01 X97.31866 Y17.72886
G01 X95.90931 Y17.63477
G01 X94.78032 Y17.35065
G01 X93.9317 Y16.87835
G01 X93.34275 Y16.27058
G01 X92.98712 Y15.58754
G01 X92.86858 Y14.82548
G01 X92.95325 Y14.17067
G01 X93.20351 Y13.59865
G01 X93.62123 Y13.10942
G01 X94.37953 Y12.65594
G01 X95.66658 Y12.19682
G01 X97.48425 Y11.72829
G01 X99.34708 Y11.27858
G01 X100.7752 Y10.8665
G01 X101.765 Y10.49581
G01 X102.7924 Y9.931319
G01 X103.6222 Y9.274626
G01 X104.2563 Y8.527613
G01 X104.7022 Y7.692163
G01 X104.9694 Y6.775802
G01 X105.0598 Y5.780412
G01 X104.9619 Y4.773732
G01 X104.6665 Y3.804686
G01 X104.1773 Y2.877035
G01 X103.5017 Y2.034058
G01 X102.6569 Y1.328441
G01 X101.6389 Y0.756421
G01 X100.4911 Y0.334933
G01 X99.24923 Y0.084674
G01 X97.91703 Y0
G01 X96.26306 Y0.084674
G01 X94.79726 Y0.338696
G01 X93.52151 Y0.763948
G01 X92.42451 Y1.358547
G01 X91.49873 Y2.126258
G01 X90.74043 Y3.065199
G01 X90.17594 Y4.133973
G01 X89.8222 Y5.291184
G01 X89.67918 Y6.538715
G01 X92.08581 Y6.755104
G01 X92.2514 Y5.840624
G01 X92.51671 Y5.040926
G01 X92.88362 Y4.35977
G01 X93.3785 Y3.776461
G01 X94.02766 Y3.270298
G01 X94.82925 Y2.846929
G01 X95.74561 Y2.525167
G01 X96.73535 Y2.333239
G01 X97.79848 Y2.269264
G01 X98.73554 Y2.318186
G01 X99.59734 Y2.463073
G01 X100.3839 Y2.707687
G01 X101.0669 Y3.035093
G01 X101.6239 Y3.435883
G01 X102.0529 Y3.908176
G01 X102.3558 Y4.431273
G01 X102.5383 Y4.984477
G01 X102.6004 Y5.565905
G01 X102.5421 Y6.145451
G01 X102.3652 Y6.672311
G01 X102.0717 Y7.150249
G01 X101.6427 Y7.577383
G01 X101.0631 Y7.957475
G01 X100.3293 Y8.288645
G01 X99.59922 Y8.529495
G01 X98.45142 Y8.84373
G01 X96.884 Y9.233231
G01 X95.28272 Y9.652837
G01 X94.03896 Y10.05551
G01 X93.14893 Y10.44125
G01 X92.30596 Y10.96622
G01 X91.61916 Y11.56835
G01 X91.08854 Y12.24763
G01 X90.71221 Y12.99276
G01 X90.48454 Y13.7981
G01 X90.40926 Y14.65989
G01 X90.50146 Y15.61577
G01 X90.77995 Y16.53025
G01 X91.24095 Y17.40145
G01 X91.88071 Y18.18421
G01 X92.68982 Y18.82962
G01 X93.67015 Y19.33954
G01 X94.77468 Y19.70646
G01 X95.95824 Y19.92662
G01 X97.22082 Y20
G01 X98.59819 Y19.92285
G01 X99.86265 Y19.69141
G01 X101.0142 Y19.30756
G01 X102.0247 Y18.77129
G01 X102.8676 Y18.09201
M08
G00 X0 Y0
M02
`;

const cvutGcode = `
G21
G90;svg#Layer_1 > g > g > path
G0 X135.16530625000001 Y4.509558333333336
G1 X140.15931666666665 Y4.509558333333336 F300
G1 X140.15931666666665 Y6.160293750000004 F300
G1 X137.25260416666666 Y6.160293750000004 F300
G1 X137.25260416666666 Y7.3316041666666685 F300
G1 X140.06327291666668 Y7.3316041666666685 F300
G1 X140.06327291666668 Y8.939477083333335 F300
G1 X137.25260416666666 Y8.939477083333335 F300
G1 X137.25260416666666 Y10.100204166666668 F300
G1 X140.15931666666665 Y10.100204166666668 F300
G1 X140.15931666666665 Y11.750675000000001 F300
G1 X135.16530625000001 Y11.750675000000001 F300
G1 X135.16530625000001 Y4.509558333333336 F300
G0 X127.88159166666665 Y4.509558333333336
G1 X133.56775208333332 Y4.509558333333336 F300
G1 X133.56775208333332 Y6.202362500000002 F300
G1 X130.43693750000003 Y6.202362500000002 F300
G1 X133.5151 Y10.227997916666668 F300
G1 X133.5151 Y11.750675000000001 F300
G1 X127.94562083333332 Y11.750675000000001 F300
G1 X127.94562083333332 Y10.057870833333336 F300
G1 X130.9057791666667 Y10.057870833333336 F300
G1 X127.88132708333333 Y6.106847916666671 F300
G1 X127.88132708333333 Y4.509558333333336 F300
G1 X127.88159166666665 Y4.509558333333336 F300
G0 X122.83413541666665 Y7.491412500000006
G1 X123.54798124999998 Y10.164497916666672 F300
G1 X123.64349583333332 Y10.164497916666672 F300
G1 X124.35654791666664 Y7.491412500000006 F300
G1 X122.83413541666665 Y7.491412500000006 F300
G0 X125.155325 Y4.509558333333336
G1 X127.29633333333332 Y4.509558333333336 F300
G1 X125.12383958333334 Y11.750675000000001 F300
G1 X122.06710833333334 Y11.750675000000001 F300
G1 X119.90546249999997 Y4.509558333333336 F300
G1 X122.04594166666665 Y4.509558333333336 F300
G1 X122.44017083333331 Y6.011068750000005 F300
G1 X124.75051249999997 Y6.011068750000005 F300
G1 X125.155325 Y4.509558333333336 F300
G0 X115.33796041666668 Y8.407135416666668
G1 X115.33796041666668 Y10.206566666666665 F300
G1 X116.17907083333333 Y10.206566666666665 F300
G1 X116.29335425150391 Y10.200379185764415 F300
G1 X116.3979289693206 Y10.182990653901573 F300
G1 X116.49368421083095 Y10.155867608731524 F300
G1 X116.58142056157456 Y10.120111752658072 F300
G1 X116.66181782407409 Y10.076499459876542 F300
G1 X116.73863605755585 Y10.023006784914447 F300
G1 X116.80725980725906 Y9.962867709288272 F300
G1 X116.86807970158296 Y9.896684742532821 F300
G1 X116.92133953214682 Y9.824883378870593 F300
G1 X116.96711759259257 Y9.747759567901234 F300
G1 X117.00503181739944 Y9.666219478753446 F300
G1 X117.03468627675142 Y9.581573473345216 F300
G1 X117.0561092967477 Y9.494197524226577 F300
G1 X117.06918148695175 Y9.404415471906901 F300
G1 X117.0736270833333 Y9.312539583333335 F300
G1 X117.069198260039 Y9.220643657232273 F300
G1 X117.05615725553729 Y9.13049268140931 F300
G1 X117.03475460996206 Y9.04245072079176 F300
G1 X117.00508931471522 Y8.956894087229113 F300
G1 X116.96711759259257 Y8.874252391975311 F300
G1 X116.92129962245453 Y8.796017190128602 F300
G1 X116.86800524221306 Y8.7230851552751 F300
G1 X116.80716988448268 Y8.655787577493237 F300
G1 X116.73856534498067 Y8.594580452923156 F300
G1 X116.66181782407406 Y8.540093441358025 F300
G1 X116.58129648254317 Y8.495511243650279 F300
G1 X116.49350082832416 Y8.458965146476636 F300
G1 X116.3977512445993 Y8.43124162229749 F300
G1 X116.29324122311641 Y8.413463885068438 F300
G1 X116.17907083333333 Y8.407135416666668 F300
G1 X115.33796041666668 Y8.407135416666668 F300
G0 X113.25066249999999 Y4.509558333333336
G1 X115.33796041666668 Y4.509558333333336 F300
G1 X115.33796041666668 Y7.054850000000004 F300
G1 X115.87003750000001 Y7.054850000000004 F300
G1 X117.12654375000001 Y4.509558333333336 F300
G1 X119.48027708333335 Y4.509558333333336 F300
G1 X118.1494229166667 Y6.74581666666667 F300
G1 X118.07737427942895 Y6.861629624518161 F300
G1 X118.00424506172843 Y6.9682430555555595 F300
G1 X117.92883991509673 Y7.0679241701043924 F300
G1 X117.8613014660494 Y7.147983333333334 F300
G1 X117.79398892601823 Y7.216883083062535 F300
G1 X117.74434583333336 Y7.256991666666665 F300
G1 X117.75519375000003 Y7.299854166666667 F300
G1 X117.88286693872368 Y7.359256754046363 F300
G1 X118.0187565728298 Y7.427647358187741 F300
G1 X118.1611725333334 Y7.506445066666671 F300
G1 X118.29937176367248 Y7.591517488594042 F300
G1 X118.43790562967378 Y7.687386403608812 F300
G1 X118.5748475166667 Y7.7953573666666705 F300
G1 X118.6719633513107 Y7.8820367257986845 F300
G1 X118.76571269939785 Y7.975857970320419 F300
G1 X118.85532992477903 Y8.077450800076729 F300
G1 X118.93997040000002 Y8.18750796666667 F300
G1 X119.01578675342006 Y8.302020829041405 F300
G1 X119.08508121711338 Y8.425572876894108 F300
G1 X119.14694609244366 Y8.559141863295405 F300
G1 X119.20029288333336 Y8.70381376666667 F300
G1 X119.23372240338924 Y8.819459690569749 F300
G1 X119.26113561287929 Y8.942653047281325 F300
G1 X119.28182302852844 Y9.074134272425614 F300
G1 X119.29495362799588 Y9.214697547168322 F300
G1 X119.29956666666668 Y9.36519166666667 F300
G1 X119.29407509175908 Y9.528524287779064 F300
G1 X119.27788684156768 Y9.687904028418195 F300
G1 X119.25135510797573 Y9.843349723166368 F300
G1 X119.21473284005634 Y9.994876054597325 F300
G1 X119.16817565195335 Y10.142481444457225 F300
G1 X119.11174557291667 Y10.286135970052086 F300
G1 X119.04539887853086 Y10.425801810871668 F300
G1 X118.96964529266604 Y10.560325657453367 F300
G1 X118.88449585497867 Y10.689664410486804 F300
G1 X118.78987358173397 Y10.813725570040589 F300
G1 X118.68561951952861 Y10.932355601290222 F300
G1 X118.57149947916668 Y11.045328906250004 F300
G1 X118.45196249323477 Y11.148515185754583 F300
G1 X118.32348452679423 Y11.245238883912574 F300
G1 X118.18578386346792 Y11.335238107868623 F300
G1 X118.03851734896692 Y11.418162415073322 F300
G1 X117.88128824471542 Y11.49356408492091 F300
G1 X117.71365416666667 Y11.560890201822922 F300
G1 X117.54798434449592 Y11.615678291331673 F300
G1 X117.37317072071073 Y11.662119538794656 F300
G1 X117.18876033306165 Y11.699623383569769 F300
G1 X116.99427189247368 Y11.727490279282124 F300
G1 X116.78920274189144 Y11.744906531025118 F300
G1 X116.57303541666668 Y11.750939583333336 F300
G1 X113.25092708333335 Y11.750939583333336 F300
G1 X113.25092708333335 Y4.509558333333336 F300
G1 X113.25066249999999 Y4.509558333333336 F300
G0 X107.8944375 Y8.407135416666668
G1 X107.8944375 Y10.195983333333334 F300
G1 X108.71438124999999 Y10.195983333333334 F300
G1 X108.80009526544134 Y10.191509538011791 F300
G1 X108.88368086421629 Y10.178460859706243 F300
G1 X108.96501694707979 Y10.157262546112424 F300
G1 X109.04395286458333 Y10.1281755859375 F300
G1 X109.119799531717 Y10.091574692706859 F300
G1 X109.1917064794259 Y10.048005187686337 F300
G1 X109.25944919054727 Y9.99766998348054 F300
G1 X109.32272447916667 Y9.940660416666669 F300
G1 X109.38018043645059 Y9.87810734789288 F300
G1 X109.4317392421086 Y9.810018951245086 F300
G1 X109.47706041615182 Y9.73643113284217 F300
G1 X109.51567187500001 Y9.657299934895835 F300
G1 X109.54604851739668 Y9.575377871709964 F300
G1 X109.56863638187893 Y9.488965988902667 F300
G1 X109.58282006269962 Y9.39789357226625 F300
G1 X109.58777083333334 Y9.301956250000002 F300
G1 X109.5820303842978 Y9.196689243562043 F300
G1 X109.56571154368812 Y9.097969026993464 F300
G1 X109.53993613828554 Y9.005445937765707 F300
G1 X109.50554107275465 Y8.91881179763159 F300
G1 X109.46311288580249 Y8.837837885802474 F300
G1 X109.41165539598664 Y8.760565658287412 F300
G1 X109.35358645427195 Y8.690494248095916 F300
G1 X109.28944655212112 Y8.627520964991566 F300
G1 X109.21961885102559 Y8.57165837862172 F300
G1 X109.14436836419753 Y8.523062114197533 F300
G1 X109.06450803776872 Y8.482334864058387 F300
G1 X108.98135379489882 Y8.45014616163704 F300
G1 X108.89516107639557 Y8.426636085772422 F300
G1 X108.80611623129815 Y8.41212491832909 F300
G1 X108.71438124999999 Y8.407135416666668 F300
G1 X107.8944375 Y8.407135416666668 F300
G0 X105.80766875000002 Y4.509558333333336
G1 X107.8944375 Y4.509558333333336 F300
G1 X107.8944375 Y6.852179166666666 F300
G1 X108.95912083333333 Y6.852179166666666 F300
G1 X109.17515107282662 Y6.858143426101286 F300
G1 X109.38040171722268 Y6.875385657538197 F300
G1 X109.5753459813045 Y6.903017263048939 F300
G1 X109.7604451130342 Y6.940262789240766 F300
G1 X109.93614169444305 Y6.98645571201772 F300
G1 X110.10285257161458 Y7.0410337890624985 F300
G1 X110.27143853948378 Y7.108074459358434 F300
G1 X110.42974632131616 Y7.1832549958990635 F300
G1 X110.57819173359043 Y7.266049897861785 F300
G1 X110.7171467288519 Y7.35603678904622 F300
G1 X110.84693112556907 Y7.4528890601754965 F300
G1 X110.96780442708335 Y7.556367708333333 F300
G1 X111.08312257297072 Y7.669639302241605 F300
G1 X111.18860292175479 Y7.788787657889239 F300
G1 X111.28445824710177 Y7.913620709129398 F300
G1 X111.3708244868206 Y8.044019298219448 F300
G1 X111.4477535215506 Y8.179926445954557 F300
G1 X111.51520667317709 Y8.321336002604166 F300
G1 X111.57243087531364 Y8.466535633047185 F300
G1 X111.61974093238464 Y8.616125849821081 F300
G1 X111.65703381834294 Y8.770123608082512 F300
G1 X111.68410873290846 Y8.928574761745192 F300
G1 X111.70066312305485 Y9.091542159132047 F300
G1 X111.70628958333334 Y9.259093750000002 F300
G1 X111.70117735467804 Y9.419273710367227 F300
G1 X111.68607044488205 Y9.576452387005528 F300
G1 X111.66125077343123 Y9.730584509261497 F300
G1 X111.62691848934435 Y9.881620631105813 F300
G1 X111.58319483333337 Y10.029496916666671 F300
G1 X111.5299212830668 Y10.174630691480576 F300
G1 X111.46763809367525 Y10.315479877076939 F300
G1 X111.39642020687016 Y10.45196793195711 F300
G1 X111.31626935782317 Y10.583985623084168 F300
G1 X111.22711858333335 Y10.711381083333338 F300
G1 X111.13036971806082 Y10.832160314202286 F300
G1 X111.02521991320745 Y10.947346348674593 F300
G1 X110.91154979011642 Y11.056761234143192 F300
G1 X110.78917912278229 Y11.160165318976423 F300
G1 X110.65787283333333 Y11.257248250000004 F300
G1 X110.52238900960474 Y11.344597405228802 F300
G1 X110.37869921795789 Y11.424917388346143 F300
G1 X110.22651174333927 Y11.4978429732586 F300
G1 X110.06549204776802 Y11.562920448419955 F300
G1 X109.89526958333335 Y11.61960041666667 F300
G1 X109.72565881485798 Y11.66484313787597 F300
G1 X109.54765528410246 Y11.701281170941996 F300
G1 X109.36085192432336 Y11.728285453906885 F300
G1 X109.16482108795242 Y11.745120530862282 F300
G1 X108.95912083333333 Y11.750939583333336 F300
G1 X105.80766875000002 Y11.750939583333336 F300
G1 X105.80766875000002 Y4.509558333333336 F300
G0 X96.77743958333333 Y4.509558333333336
G1 X99.6315 Y4.509558333333336 F300
G1 X101.80346458333334 Y11.750675000000001 F300
G1 X99.46084375 Y11.750675000000001 F300
G1 X98.22550416666667 Y6.330685416666665 F300
G1 X98.18317083333334 Y6.330685416666665 F300
G1 X96.94783125000001 Y11.750675000000001 F300
G1 X94.60521041666668 Y11.750675000000001 F300
G1 X96.77743958333333 Y4.509558333333336 F300
G0 X87.77975416666666 Y4.509558333333336
G1 X89.86705208333335 Y4.509558333333336 F300
G1 X89.86705208333335 Y10.057870833333336 F300
G1 X91.66648333333335 Y10.057870833333336 F300
G1 X91.66648333333335 Y11.750675000000001 F300
G1 X85.97000416666667 Y11.750675000000001 F300
G1 X85.97000416666667 Y10.057870833333336 F300
G1 X87.78001875000001 Y10.057870833333336 F300
G1 X87.78001875000001 Y4.509558333333336 F300
G1 X87.77975416666666 Y4.509558333333336 F300
G0 X81.54008541666666 Y4.339166666666668
G1 X81.74620293594653 Y4.343253931942209 F300
G1 X81.94728065957452 Y4.355475399017229 F300
G1 X82.14314611229113 Y4.3757886488646855 F300
G1 X82.33363937788961 Y4.404177142360705 F300
G1 X82.51860771666668 Y4.440652366666669 F300
G1 X82.70395143202296 Y4.486931878445601 F300
G1 X82.88219144911331 Y4.541698742114212 F300
G1 X83.0533037204816 Y4.604968064906028 F300
G1 X83.2172545449988 Y4.676809911342572 F300
G1 X83.37399081666666 Y4.757352266666668 F300
G1 X83.52607829021257 Y4.848492773678492 F300
G1 X83.66996709152617 Y4.948734279984512 F300
G1 X83.80565631484436 Y5.05838464464439 F300
G1 X83.93307281598538 Y5.177848985501528 F300
G1 X84.05205651666665 Y5.307630566666668 F300
G1 X84.14234867090669 Y5.42109189234967 F300
G1 X84.2266072675107 Y5.541974079220438 F300
G1 X84.30465515796126 Y5.670742658321295 F300
G1 X84.37624148518418 Y5.807919097026886 F300
G1 X84.44103643540792 Y5.954079200750982 F300
G1 X84.49862661666666 Y6.109851466666669 F300
G1 X84.54489799855693 Y6.262531236889701 F300
G1 X84.58418900991629 Y6.4246475613807155 F300
G1 X84.6159668509553 Y6.59691313630746 F300
G1 X84.63960821420217 Y6.780084238814747 F300
G1 X84.65439711465673 Y6.974959513336344 F300
G1 X84.65952291666666 Y7.18237916666667 F300
G1 X84.65952291666666 Y11.750939583333336 F300
G1 X82.57275416666667 Y11.750939583333336 F300
G1 X82.57275416666667 Y7.374202083333336 F300
G1 X82.56801676942729 Y7.23193993599076 F300
G1 X82.55465849476325 Y7.103504260547043 F300
G1 X82.53381918075652 Y6.987587871570697 F300
G1 X82.50645458364734 Y6.882976506914533 F300
G1 X82.47334135185648 Y6.788551957365518 F300
G1 X82.4350826388889 Y6.703297145061734 F300
G1 X82.38638983426526 Y6.617157403651431 F300
G1 X82.33233943863932 Y6.540662977513146 F300
G1 X82.27331344123436 Y6.472965317120623 F300
G1 X82.20953486179272 Y6.413356951176786 F300
G1 X82.14108588039203 Y6.36127775714961 F300
G1 X82.06792916666667 Y6.316319521604944 F300
G1 X81.97474240548914 Y6.271835066107343 F300
G1 X81.87548487364843 Y6.237216563054689 F300
G1 X81.77006200902667 Y6.212312110308171 F300
G1 X81.65831967361954 Y6.197173575161378 F300
G1 X81.54008541666666 Y6.192043750000005 F300
G1 X81.42167846893415 Y6.197176333994661 F300
G1 X81.30982264450819 Y6.212320362103291 F300
G1 X81.20433722094073 Y6.237228873663644 F300
G1 X81.10506008916778 Y6.271845922369368 F300
G1 X81.0118888888889 Y6.316319521604944 F300
G1 X80.93873561060408 Y6.361280023638417 F300
G1 X80.87030428001015 Y6.4133605855639075 F300
G1 X80.80655455514356 Y6.472969257617337 F300
G1 X80.7475658251042 Y6.5406662131892315 F300
G1 X80.69355845226846 Y6.617159178510176 F300
G1 X80.64491180555555 Y6.703297145061733 F300
G1 X80.60669642551542 Y6.7885457515616885 F300
G1 X80.57362348466991 Y6.882966531059544 F300
G1 X80.54629466448213 Y6.987576678532116 F300
G1 X80.52548461793562 Y7.103494402032036 F300
G1 X80.51214646651995 Y7.231933866402821 F300
G1 X80.50741666666667 Y7.374202083333336 F300
G1 X80.50741666666667 Y11.750939583333336 F300
G1 X78.41985416666667 Y11.750939583333336 F300
G1 X78.41985416666667 Y7.18237916666667 F300
G1 X78.42498197919913 Y6.97493150689535 F300
G1 X78.43977651497863 Y6.780033516849481 F300
G1 X78.46342661025605 Y6.596844303317717 F300
G1 X78.49521583818319 Y6.42456458953715 F300
G1 X78.53452053291637 Y6.262437518684088 F300
G1 X78.58080761666668 Y6.1097498666666725 F300
G1 X78.63841719177354 Y5.953970985613861 F300
G1 X78.70323364327304 Y5.807806487626381 F300
G1 X78.77484344559376 Y5.67062752450349 F300
G1 X78.85291670372843 Y5.541857987069085 F300
G1 X78.93720252552652 Y5.420976149718012 F300
G1 X79.02752376666668 Y5.307516266666671 F300
G1 X79.14654244244217 Y5.177741081787807 F300
G1 X79.27399615984858 Y5.058283846581319 F300
G1 X79.40972480339333 Y4.948641191913708 F300
G1 X79.55365518065557 Y4.848407911901335 F300
G1 X79.70578631666666 Y4.75727606666667 F300
G1 X79.86256340954404 Y4.676744331417861 F300
G1 X80.02655592101631 Y4.604913040350029 F300
G1 X80.19771044289331 Y4.541654064376317 F300
G1 X80.37599293358082 Y4.48689715308422 F300
G1 X80.56137896666667 Y4.4406269666666685 F300
G1 X80.7463883305383 Y4.40415970999276 F300
G1 X80.93692103595353 Y4.37577814652339 F300
G1 X81.13282383881337 Y4.355470406023038 F300
G1 X81.33393630231745 Y4.343252598423409 F300
G1 X81.54008541666666 Y4.339166666666668 F300
G0 X72.11615624999999 Y4.509558333333336
G1 X74.97021666666666 Y4.509558333333336 F300
G1 X77.14218125 Y11.750675000000001 F300
G1 X74.79982499999998 Y11.750675000000001 F300
G1 X73.56448541666666 Y6.330685416666665 F300
G1 X73.52162291666667 Y6.330685416666665 F300
G1 X72.28681250000001 Y11.750675000000001 F300
G1 X69.94419166666668 Y11.750675000000001 F300
G1 X72.11615624999999 Y4.509558333333336 F300
G0 X67.05811666666666 Y4.392347916666666
G1 X67.27580856290618 Y4.397106412660325 F300
G1 X67.48355636563394 Y4.410535388275877 F300
G1 X67.6813331129108 Y4.431451144159282 F300
G1 X67.86914297839508 Y4.4587779320987675 F300
G1 X68.05972140340866 Y4.494142283599709 F300
G1 X68.23736677567364 Y4.534303142040028 F300
G1 X68.40227839430112 Y4.578132298700258 F300
G1 X68.55469799382716 Y4.624632484567902 F300
G1 X68.75843080772196 Y4.696702304702169 F300
G1 X68.93357339584485 Y4.769119388691467 F300
G1 X69.08191458333332 Y4.839758333333333 F300
G1 X69.08191458333332 Y6.6606208333333345 F300
G1 X68.94294088321584 Y6.58857096318356 F300
G1 X68.7954818333595 Y6.519093533201621 F300
G1 X68.63730679012346 Y6.453628472222227 F300
G1 X68.4761420780519 Y6.396996113165617 F300
G1 X68.29902920441552 Y6.346300066124861 F300
G1 X68.10279945987654 Y6.303433333333338 F300
G1 X67.95645380792976 Y6.279854139698951 F300
G1 X67.79692090928953 Y6.26160088094881 F300
G1 X67.62246601654404 Y6.249740194504506 F300
G1 X67.43117916666667 Y6.245489583333338 F300
G1 X67.31829132464253 Y6.249614252614449 F300
G1 X67.19976688166476 Y6.262312394071154 F300
G1 X67.07618755858853 Y6.284148076288229 F300
G1 X66.94823626666668 Y6.315788316666673 F300
G1 X66.82434089193488 Y6.355284143036275 F300
G1 X66.69987612931473 Y6.40413672427119 F300
G1 X66.57563833725682 Y6.4627915203071025 F300
G1 X66.45250446666667 Y6.531781450000005 F300
G1 X66.33563376293066 Y6.608746147581848 F300
G1 X66.22286453803981 Y6.695586388363732 F300
G1 X66.11500519039502 Y6.792829077883034 F300
G1 X66.01298286666666 Y6.901114383333338 F300
G1 X65.93907226596686 Y6.992493322402993 F300
G1 X65.8701644199895 Y7.090730413334932 F300
G1 X65.80673090450648 Y7.196278979271961 F300
G1 X65.74933989603323 Y7.3096546112137215 F300
G1 X65.69867056666666 Y7.431432516666671 F300
G1 X65.65818271240073 Y7.553120304643051 F300
G1 X65.62502768444926 Y7.683075747186081 F300
G1 X65.60002173542563 Y7.822053011592358 F300
G1 X65.58414755130352 Y7.970865373330872 F300
G1 X65.57856666666666 Y8.130381250000003 F300
G1 X65.5842032278116 Y8.297944245839917 F300
G1 X65.60030408429478 Y8.454303129468238 F300
G1 X65.62578405532342 Y8.60031050990671 F300
G1 X65.65972222706624 Y8.736768465848622 F300
G1 X65.7013533000149 Y8.864424087292168 F300
G1 X65.7500580078125 Y8.983964290364588 F300
G1 X65.80959556406627 Y9.103836405169488 F300
G1 X65.8759072783094 Y9.215201591816752 F300
G1 X65.94847500393003 Y9.318587249128164 F300
G1 X66.02688388836236 Y9.414456695780563 F300
G1 X66.11080996020075 Y9.503205742174718 F300
G1 X66.20000677083333 Y9.585159635416671 F300
G1 X66.31530252158481 Y9.676012594396429 F300
G1 X66.43657502695854 Y9.756692120461175 F300
G1 X66.56332718657718 Y9.827566240804199 F300
G1 X66.69513558928858 Y9.888896727169872 F300
G1 X66.83162506510416 Y9.940838183593755 F300
G1 X66.97159101806619 Y9.983212067232577 F300
G1 X67.11371348280984 Y10.015953732896628 F300
G1 X67.257493488692 Y10.039250367438418 F300
G1 X67.4024547025317 Y10.053211736113745 F300
G1 X67.54812499999998 Y10.057870833333336 F300
G1 X67.7676198360292 Y10.052130788790986 F300
G1 X67.9661388432413 Y10.03618139185282 F300
G1 X68.1464949074074 Y10.011735339506178 F300
G1 X68.32554908260892 Y9.977081648483844 F300
G1 X68.49037101212457 Y9.935233486528338 F300
G1 X68.64308842592592 Y9.887400771604941 F300
G1 X68.7932478871226 Y9.831583617805089 F300
G1 X68.93521334272873 Y9.77081327424791 F300
G1 X69.07053749999999 Y9.705974999999999 F300
G1 X69.07053749999999 Y11.505935416666665 F300
G1 X68.92831022058708 Y11.56650676838923 F300
G1 X68.77287628325291 Y11.624721664419567 F300
G1 X68.60146064814815 Y11.679423688271605 F300
G1 X68.42803687362252 Y11.72524118186518 F300
G1 X68.23348938082286 Y11.766281126702284 F300
G1 X68.01402685185185 Y11.800936033950618 F300
G1 X67.79390891749833 Y11.82491038689673 F300
G1 X67.54439775992697 Y11.840874068165235 F300
G1 X67.26078749999999 Y11.846718750000003 F300
G1 X67.04517445536521 Y11.8419326399612 F300
G1 X66.83342423165496 Y11.827770741651975 F300
G1 X66.62562811339856 Y11.80449690101807 F300
G1 X66.42187292727401 Y11.772334378838075 F300
G1 X66.22224538416987 Y11.731466567491227 F300
G1 X66.02683645 Y11.682037850000004 F300
G1 X65.83179569642483 Y11.622854199346374 F300
G1 X65.64233830515182 Y11.555301912292979 F300
G1 X65.45851914434222 Y11.479544414123312 F300
G1 X65.28040270015673 Y11.395701104600375 F300
G1 X65.108068267545 Y11.303848662205281 F300
G1 X64.94161509999999 Y11.204022550000005 F300
G1 X64.77967633607024 Y11.095158953450865 F300
G1 X64.62476574786149 Y10.978717918328769 F300
G1 X64.47694713929042 Y10.854710601748296 F300
G1 X64.33631703998948 Y10.723101247833306 F300
G1 X64.20301082925123 Y10.58380966410486 F300
G1 X64.07720864999999 Y10.436713950000001 F300
G1 X63.96055004559849 Y10.283616535014863 F300
G1 X63.85213113418759 Y10.123221326425801 F300
G1 X63.752144105897926 Y9.955333234004204 F300
G1 X63.660845848106696 Y9.779714998383325 F300
G1 X63.578563957143686 Y9.596091325171203 F300
G1 X63.50570229999999 Y9.404153150000003 F300
G1 X63.44527992036264 Y9.212503147266931 F300
G1 X63.39452831211026 Y9.013127120746345 F300
G1 X63.353924876685795 Y8.805643344843931 F300
G1 X63.32403896984347 Y8.589645058023564 F300
G1 X63.30553602523484 Y8.364705251198549 F300
G1 X63.29918124999999 Y8.130381250000003 F300
G1 X63.30486204583518 Y7.895735229648503 F300
G1 X63.32148672233641 Y7.670372284950377 F300
G1 X63.34840524600463 Y7.453913725545671 F300
G1 X63.38504446568585 Y7.245991067996138 F300
G1 X63.4309060771386 Y7.046249744026906 F300
G1 X63.48556433333334 Y6.854352983333337 F300
G1 X63.55204283929871 Y6.660937648160802 F300
G1 X63.627241753847024 Y6.476074109914915 F300
G1 X63.710792389949475 Y6.299453755851747 F300
G1 X63.80239492189618 Y6.1307960393945775 F300
G1 X63.90181473985453 Y5.969852647930614 F300
G1 X64.00887841666666 Y5.8164116166666675 F300
G1 X64.1255100578333 Y5.667846234668322 F300
G1 X64.24934890074069 Y5.527284167373711 F300
G1 X64.38026558051597 Y5.394573281302654 F300
G1 X64.5181797394277 Y5.269603795135344 F300
G1 X64.6630551378629 Y5.152311555140621 F300
G1 X64.8148945 Y5.04268105 F300
G1 X64.9717525281849 Y4.941945846396257 F300
G1 X65.13480018668614 Y4.849182658723573 F300
G1 X65.30404460260642 Y4.764426828953776 F300
G1 X65.47951847234202 Y4.687761520454972 F300
G1 X65.6612751340945 Y4.619319588856898 F300
G1 X65.84938358333333 Y4.559285183333333 F300
G1 X66.03735198805191 Y4.509461664858945 F300
G1 X66.23064755915274 Y4.468122352443952 F300
G1 X66.42931752878918 Y4.435469086262871 F300
G1 X66.6334155035329 Y4.411750310727018 F300
G1 X66.84299727060802 Y4.3972619180642205 F300
G1 X67.05811666666666 Y4.392347916666666 F300
G0 X65.93998749999999 Y12.187237500000004
G1 X68.13391250000001 Y12.187237500000004 F300
G1 X69.59282499999999 Y13.827125000000004 F300
G1 X67.78254583333333 Y13.827125000000004 F300
G1 X67.05811666666666 Y13.038931250000001 F300
G1 X67.01578333333335 Y13.038931250000001 F300
G1 X66.29161875 Y13.827125000000004 F300
G1 X64.48186875 Y13.827125000000004 F300
G1 X65.93998749999999 Y12.187237500000004 F300;svg#Layer_1 > g > g > path
G0 X107.16048333333333 Y15.352977083333338
G1 X109.24725208333334 Y15.352977083333338 F300
G1 X109.24725208333334 Y22.594093750000003 F300
G1 X107.16048333333333 Y22.594093750000003 F300
G1 X107.16048333333333 Y15.352977083333338 F300
G0 X107.09618958333334 Y23.030656250000003
G1 X108.86360625 Y23.030656250000003 F300
G1 X110.36511666666668 Y24.670014583333337 F300
G1 X107.9373 Y24.670014583333337 F300
G1 X107.09618958333334 Y23.030656250000003 F300
G0 X98.17311666666666 Y15.352977083333338
G1 X100.25988541666666 Y15.352977083333338 F300
G1 X100.25988541666666 Y19.6977 F300
G1 X100.29189999999998 Y19.6977 F300
G1 X102.48529583333332 Y15.352977083333338 F300
G1 X105.0305875 Y15.352977083333338 F300
G1 X105.0305875 Y22.594093750000003 F300
G1 X102.94328958333332 Y22.594093750000003 F300
G1 X102.94328958333332 Y18.270802083333333 F300
G1 X102.91180416666664 Y18.270802083333333 F300
G1 X100.73931041666665 Y22.594093750000003 F300
G1 X98.17311666666664 Y22.594093750000003 F300
G1 X98.17311666666664 Y15.352977083333338 F300
G1 X98.17311666666666 Y15.352977083333338 F300
G0 X93.55163958333333 Y15.22544791666667
G1 X93.7598246800127 Y15.231363670929566 F300
G1 X93.95618534844175 Y15.248497323573089 F300
G1 X94.14140267459847 Y15.276018210363555 F300
G1 X94.31612993767345 Y15.31321419969486 F300
G1 X94.48098649496247 Y15.359489941134683 F300
G1 X94.63655113932289 Y15.414364550781254 F300
G1 X94.79283927340121 Y15.48195953845262 F300
G1 X94.93922999667896 Y15.558317444852685 F300
G1 X95.07623811380732 Y15.643115086321055 F300
G1 X95.20431006078564 Y15.736144652334112 F300
G1 X95.32381610035874 Y15.837306856198097 F300
G1 X95.43504296875 Y15.946602864583337 F300
G1 X95.53798793443131 Y16.0638805027205 F300
G1 X95.63257887662364 Y16.188947120150754 F300
G1 X95.71891765360641 Y16.321921062494052 F300
G1 X95.7970173725165 Y16.46298635229805 F300
G1 X95.86679915840936 Y16.612382742666526 F300
G1 X95.9280898763021 Y16.770395475260422 F300
G1 X95.97795315806584 Y16.92788322159312 F300
G1 X96.01953963608364 Y17.09294423944913 F300
G1 X96.05258135138072 Y17.265821733017837 F300
G1 X96.07673747148564 Y17.446774370636163 F300
G1 X96.09159447326968 Y17.6360692306823 F300
G1 X96.09666666666668 Y17.833975000000006 F300
G1 X96.09666666666668 Y22.593829166666673 F300
G1 X94.00910416666667 Y22.593829166666673 F300
G1 X94.00910416666667 Y17.90858750000001 F300
G1 X94.00281408403589 Y17.78816286871656 F300
G1 X93.98478880023517 Y17.67635726021194 F300
G1 X93.95604334602058 Y17.572533223057746 F300
G1 X93.91726754639917 Y17.476121411787695 F300
G1 X93.86884560185187 Y17.386662577160507 F300
G1 X93.80995489286995 Y17.302675034146393 F300
G1 X93.74199070916103 Y17.226310194967578 F300
G1 X93.66494111165207 Y17.157410537877855 F300
G1 X93.57858325549404 Y17.096021497847488 F300
G1 X93.48252453703705 Y17.042420061728407 F300
G1 X93.3837636392848 Y16.999921116433534 F300
G1 X93.27674473851738 Y16.965593909680333 F300
G1 X93.16105819277823 Y16.939991194803042 F300
G1 X93.03624394553007 Y16.92388043670487 F300
G1 X92.90182291666669 Y16.918252083333346 F300
G1 X92.77279478780532 Y16.922530873942083 F300
G1 X92.6586775441956 Y16.934112583971753 F300
G1 X92.5568744109612 Y16.951344530651767 F300
G1 X92.465128125 Y16.972855468750012 F300
G1 X92.3427827489073 Y17.010528604367202 F300
G1 X92.23038330922111 Y17.05349007014936 F300
G1 X92.12447708333335 Y17.099491666666676 F300
G1 X92.12447708333335 Y15.427589583333347 F300
G1 X92.22996779891547 Y15.394688611232468 F300
G1 X92.35945286771258 Y15.36113061497154 F300
G1 X92.51329699074076 Y15.32791026234569 F300
G1 X92.74949903781474 Y15.287303899073228 F300
G1 X93.01341828703704 Y15.254218904320993 F300
G1 X93.19229841190216 Y15.238695991537693 F300
G1 X93.37257666419431 Y15.228876221734264 F300
G1 X93.55163958333333 Y15.22544791666667 F300
G0 X87.7585875 Y17.035462500000005
G1 X87.62316573938173 Y17.04100296617711 F300
G1 X87.49736487874222 Y17.056998557069374 F300
G1 X87.38032717188592 Y17.082656588389806 F300
G1 X87.27126131004393 Y17.117378882228135 F300
G1 X87.16945325239874 Y17.16075969340144 F300
G1 X87.07427784277465 Y17.21258084043712 F300
G1 X86.98521041666667 Y17.272803549382722 F300
G1 X86.90211557143948 Y17.341304828228203 F300
G1 X86.824708880419 Y17.418204729678408 F300
G1 X86.75279180107772 Y17.50375089407522 F300
G1 X86.68626749652316 Y17.598297505932344 F300
G1 X86.62514256596981 Y17.70229060764012 F300
G1 X86.56952691514984 Y17.816252914345476 F300
G1 X86.51963194444444 Y17.940768672839518 F300
G1 X86.4744556139325 Y18.081045191985254 F300
G1 X86.43631759661878 Y18.233209616292804 F300
G1 X86.40564537090381 Y18.397878137203087 F300
G1 X86.38295293082845 Y18.575685096226668 F300
G1 X86.36883625791589 Y18.767270910677297 F300
G1 X86.36396875 Y18.973270833333345 F300
G1 X86.36883673261839 Y19.17932197141977 F300
G1 X86.38295442926331 Y19.37094361455765 F300
G1 X86.40564786235346 Y19.54877317583797 F300
G1 X86.43632050228246 Y19.71345308689843 F300
G1 X86.47445784446654 Y19.8656195719196 F300
G1 X86.51963194444446 Y20.005890586419767 F300
G1 X86.56952782531187 Y20.130406529574902 F300
G1 X86.62514416907052 Y20.244364687306717 F300
G1 X86.68626948094058 Y20.348350288340026 F300
G1 X86.75279380256576 Y20.44288692510698 F300
G1 X86.82471052589696 Y20.528421422761447 F300
G1 X86.90211652341704 Y20.605308664084074 F300
G1 X86.98521041666666 Y20.67379691358026 F300
G1 X87.07427592531009 Y20.734006283835015 F300
G1 X87.16945002903682 Y20.785815318400864 F300
G1 X87.27125744374777 Y20.829185418002403 F300
G1 X87.38032333971123 Y20.86389863587845 F300
G1 X87.49736173826028 Y20.889549551359384 F300
G1 X87.62316390004943 Y20.90554042835419 F300
G1 X87.7585875 Y20.91107916666668 F300
G1 X87.89601534472084 Y20.905486309128662 F300
G1 X88.02292980686791 Y20.889376213702366 F300
G1 X88.14032382343004 Y20.863599765091756 F300
G1 X88.24911038959436 Y20.828804995134874 F300
G1 X88.35011318166225 Y20.785438395784464 F300
G1 X88.44405616079511 Y20.73374914952856 F300
G1 X88.53155300925927 Y20.67379691358026 F300
G1 X88.61317739452497 Y20.60538964035839 F300
G1 X88.68895056432041 Y20.5285841769906 F300
G1 X88.75911049669578 Y20.443117470704816 F300
G1 X88.82379032064966 Y20.348617606659047 F300
G1 X88.88301851664383 Y20.244619085310354 F300
G1 X88.93672108478376 Y20.130578578433216 F300
G1 X88.98472546296296 Y20.00589058641977 F300
G1 X89.02787463398992 Y19.86584963263324 F300
G1 X89.06418301165156 Y19.713814443827463 F300
G1 X89.09327940240141 Y19.549169074314158 F300
G1 X89.11472241626333 Y19.371283683998527 F300
G1 X89.12800663868028 Y19.179525803522242 F300
G1 X89.13256874999999 Y18.973270833333345 F300
G1 X89.12800500048459 Y18.767119836616306 F300
G1 X89.11471596632059 Y18.5754346173493 F300
G1 X89.09326499715374 Y18.397594823000023 F300
G1 X89.06415739430955 Y18.232971957482608 F300
G1 X89.02783432161897 Y18.080939912871862 F300
G1 X88.98466666666667 Y17.940886265432106 F300
G1 X88.93665091394764 Y17.816198547821312 F300
G1 X88.88293730006912 Y17.702149478034162 F300
G1 X88.82369870272434 Y17.59813567398183 F300
G1 X88.75900950430949 Y17.50361568650869 F300
G1 X88.68884170055298 Y17.41812567109632 F300
G1 X88.61306275506118 Y17.34129515810857 F300
G1 X88.53143541666665 Y17.272862345679016 F300
G1 X88.44393062062645 Y17.2128798927166 F300
G1 X88.3499858959064 Y17.16116491303511 F300
G1 X88.24898875219857 Y17.117776975198915 F300
G1 X88.14021644332797 Y17.082965213372848 F300
G1 X88.0228465511145 Y17.057176182448597 F300
G1 X87.89596740723877 Y17.04105815582991 F300
G1 X87.7585875 Y17.035462500000005 F300
G0 X87.7585875 Y15.182585416666669
G1 X87.99488561049367 Y15.188175958661795 F300
G1 X88.22224392080128 Y15.204599345761496 F300
G1 X88.440944559735 Y15.231381873235502 F300
G1 X88.65126629331344 Y15.268115116061974 F300
G1 X88.85347958925374 Y15.314456267688143 F300
G1 X89.04784150313945 Y15.370128225159634 F300
G1 X89.2345904296875 Y15.434919368489586 F300
G1 X89.4219747565212 Y15.51227185453283 F300
G1 X89.6008085074282 Y15.59899391350997 F300
G1 X89.77134868708599 Y15.694957056837815 F300
G1 X89.93381288707727 Y15.80011174050527 F300
G1 X90.08837243798838 Y15.91448531135777 F300
G1 X90.2351457831914 Y16.038179345390777 F300
G1 X90.3741921875 Y16.17136640625 F300
G1 X90.50348489779228 Y16.311943294813723 F300
G1 X90.62483227012449 Y16.46172934046701 F300
G1 X90.73820056391217 Y16.621017015751715 F300
G1 X90.84348084771851 Y16.790160749552815 F300
G1 X90.94048444554227 Y16.96957186099079 F300
G1 X91.02893903055914 Y17.15971329761985 F300
G1 X91.10848535156249 Y17.361094303385414 F300
G1 X91.17385305200997 Y17.558207925472324 F300
G1 X91.23065959410192 Y17.7655015424801 F300
G1 X91.2784775659294 Y17.983481362244554 F300
G1 X91.31680156360946 Y18.212681206585685 F300
G1 X91.34504700353352 Y18.453658496030297 F300
G1 X91.36254918085842 Y18.706990494027888 F300
G1 X91.3685625 Y18.973270833333334 F300
G1 X91.36254966722841 Y19.23951525194577 F300
G1 X91.3450485877009 Y19.492824035247832 F300
G1 X91.31680434755565 Y19.733789477717778 F300
G1 X91.2784811865696 Y19.962987579864844 F300
G1 X91.23066326916886 Y20.18097456887443 F300
G1 X91.1738556276278 Y20.388283137578792 F300
G1 X91.1084853515625 Y20.58541842447917 F300
G1 X91.02894028005471 Y20.7868151722436 F300
G1 X90.94048663171922 Y20.976977783175784 F300
G1 X90.84348354657466 Y21.156414574425284 F300
G1 X90.73820329006915 Y21.32558764033387 F300
G1 X90.62483452549351 Y21.484907515345874 F300
G1 X90.50348621836677 Y21.634727907100064 F300
G1 X90.3741921875 Y21.775340625000002 F300
G1 X90.23514336693783 Y21.908565577058287 F300
G1 X90.08836814084184 Y22.032296990708957 F300
G1 X89.93380741461277 Y22.1467071180395 F300
G1 X89.77134290791732 Y22.25189723914158 F300
G1 X89.60080344428629 Y22.34789440992325 F300
G1 X89.42197157579494 Y22.43464878950715 F300
G1 X89.2345904296875 Y22.512031575520837 F300
G1 X89.04783854334445 Y22.576851707305494 F300
G1 X88.85347482350318 Y22.63254929520997 F300
G1 X88.65126080342287 Y22.678912445299027 F300
G1 X88.44093932451929 Y22.715663702112906 F300
G1 X88.22223978952607 Y22.742459819544937 F300
G1 X87.99488328076646 Y22.758891838144145 F300
G1 X87.7585875 Y22.76448541666667 F300
G1 X87.52375669386707 Y22.758911350368688 F300
G1 X87.29737415455733 Y22.742523793398618 F300
G1 X87.07920269046458 Y22.71577687795887 F300
G1 X86.86900670366445 Y22.679060633290263 F300
G1 X86.66655730543432 Y22.632700750900106 F300
G1 X86.47163759347553 Y22.57695860504458 F300
G1 X86.28404804687501 Y22.512031575520837 F300
G1 X86.09606289842148 Y22.434694079119954 F300
G1 X85.91641433964013 Y22.347973597061557 F300
G1 X85.74487837057983 Y22.25199496231945 F300
G1 X85.5812682786746 Y22.146805813077286 F300
G1 X85.42544165788284 Y22.032378633266898 F300
G1 X85.27730721424633 Y21.908613373574727 F300
G1 X85.13683125 Y21.775340625000005 F300
G1 X85.00604887326459 Y21.634624667203386 F300
G1 X84.88322608237604 Y21.48472343001427 F300
G1 X84.76840896312741 Y21.325352519646586 F300
G1 X84.66171846622349 Y21.156165472881128 F300
G1 X84.56335539529296 Y20.97675876938396 F300
G1 X84.47360475271799 Y20.786677051096973 F300
G1 X84.39283945312499 Y20.585418424479165 F300
G1 X84.3263253320835 Y20.388159276490384 F300
G1 X84.26850022853026 Y20.1807734800174 F300
G1 X84.21980375960779 Y19.962753744196327 F300
G1 X84.18075690260602 Y19.73356407968617 F300
G1 X84.15196354999078 Y19.492643968249055 F300
G1 X84.13411179134604 Y19.23941226882775 F300
G1 X84.12797499999999 Y18.973270833333334 F300
G1 X84.13411205157855 Y18.70712598323683 F300
G1 X84.15196439146938 Y18.453897099031405 F300
G1 X84.18075837015449 Y18.212985297817156 F300
G1 X84.21980565298708 Y17.983808747632057 F300
G1 X84.26850213424055 Y17.765806280280966 F300
G1 X84.32632665587015 Y17.558441294756555 F300
G1 X84.392839453125 Y17.361205924479165 F300
G1 X84.47360505184022 Y17.159969403875728 F300
G1 X84.56335585997796 Y16.969911789306995 F300
G1 X84.66171895627421 Y16.79053072367531 F300
G1 X84.76840935954584 Y16.62137042807516 F300
G1 X84.88322631386775 Y16.46202700107465 F300
G1 X85.00604894096827 Y16.312153635012667 F300
G1 X85.13683125 Y16.171465625000003 F300
G1 X85.27730512581742 Y16.038222939179626 F300
G1 X85.42543798077693 Y15.914486564558612 F300
G1 X85.58126364198837 Y15.800086982950464 F300
G1 X85.74487352172488 Y15.694924040241414 F300
G1 X85.91641013243976 Y15.598970113355946 F300
G1 X86.09606028054968 Y15.51227272459612 F300
G1 X86.284048046875 Y15.434956575520836 F300
G1 X86.47163554888485 Y15.370049923495689 F300
G1 X86.66655402035998 Y15.31432561177336 F300
G1 X86.86900292854014 Y15.267980887488898 F300
G1 X87.0791991002645 Y15.23127694063454 F300
G1 X87.29737133019738 Y15.204539221927211 F300
G1 X87.5237551068095 Y15.188157458817667 F300
G1 X87.7585875 Y15.182585416666669 F300
G0 X78.89927916666667 Y19.25055416666667
G1 X78.89927916666667 Y21.049985416666665 F300
G1 X79.74091875 Y21.049985416666665 F300
G1 X79.85508476808693 Y21.04379570480131 F300
G1 X79.95956597422004 Y21.026399313416036 F300
G1 X80.05524918038513 Y20.999260811453492 F300
G1 X80.14293255412068 Y20.963479699241926 F300
G1 X80.22329336419753 Y20.9198300154321 F300
G1 X80.30005636589162 Y20.86630765454545 F300
G1 X80.3686420287414 Y20.80612904140898 F300
G1 X80.42943770233225 Y20.739894710833095 F300
G1 X80.48268395986824 Y20.668028603276134 F300
G1 X80.52845594135802 Y20.590825540123458 F300
G1 X80.56635694971001 Y20.509220298294725 F300
G1 X80.59600533910935 Y20.424497776759637 F300
G1 X80.61742681184806 Y20.33703365091622 F300
G1 X80.63049960508702 Y20.24715175946653 F300
G1 X80.63494583333333 Y20.15516458333333 F300
G1 X80.63051783816263 Y20.063378498766294 F300
G1 X80.61747932769099 Y19.97332632624977 F300
G1 X80.59608075627979 Y19.885372266945136 F300
G1 X80.56642094739217 Y19.799892918820806 F300
G1 X80.52845594135802 Y19.717318364197528 F300
G1 X80.48265370394446 Y19.6391524079652 F300
G1 X80.42937994756826 Y19.56628063358337 F300
G1 X80.36857091263465 Y19.499035233700265 F300
G1 X80.2999995040079 Y19.43787295401575 F300
G1 X80.22329336419753 Y19.383423996913574 F300
G1 X80.14281672090314 Y19.338870041015184 F300
G1 X80.05507790700352 Y19.302347826750157 F300
G1 X79.9593998985876 Y19.274643134500366 F300
G1 X79.8549790841465 Y19.256877983593135 F300
G1 X79.74091875 Y19.25055416666666 F300
G1 X78.89927916666667 Y19.25055416666666 F300
G1 X78.89927916666667 Y19.25055416666667 F300
G0 X76.81251041666665 Y15.352977083333338
G1 X78.89927916666667 Y15.352977083333338 F300
G1 X78.89927916666667 Y17.897739583333337 F300
G1 X79.43188541666666 Y17.897739583333337 F300
G1 X80.68839166666666 Y15.352977083333338 F300
G1 X83.04159583333333 Y15.352977083333338 F300
G1 X81.71074166666666 Y17.589235416666668 F300
G1 X81.63869413823767 Y17.705050527463477 F300
G1 X81.56558341049384 Y17.81166180555556 F300
G1 X81.49022231551233 Y17.911348576833603 F300
G1 X81.42277700617285 Y17.991402083333334 F300
G1 X81.35560908556684 Y18.060318298604077 F300
G1 X81.30619375 Y18.100410416666666 F300
G1 X81.3165125 Y18.142743749999998 F300
G1 X81.44418870027403 Y18.202241366580065 F300
G1 X81.58007866595021 Y18.27071005827052 F300
G1 X81.72249128333335 Y18.349569600000002 F300
G1 X81.86069185225209 Y18.434691540446234 F300
G1 X81.99922584164672 Y18.530600014798065 F300
G1 X82.13616626666668 Y18.638602549999998 F300
G1 X82.23328172456758 Y18.725302592291786 F300
G1 X82.32703099906598 Y18.81914367331689 F300
G1 X82.41664837720617 Y18.92075670729681 F300
G1 X82.50128915 Y19.030835699999997 F300
G1 X82.57710373925201 Y19.14536885083895 F300
G1 X82.64639785565548 Y19.26894654361338 F300
G1 X82.70826346769303 Y19.402548330303702 F300
G1 X82.76161163333333 Y19.54726215 F300
G1 X82.79503991646371 Y19.662937306531035 F300
G1 X82.8224529354619 Y19.78616752236251 F300
G1 X82.84314080347872 Y19.91769443084551 F300
G1 X82.85627204529145 Y20.058313516494685 F300
G1 X82.86088541666666 Y20.208875 F300
G1 X82.85539109273098 Y20.37220742757471 F300
G1 X82.83919541510329 Y20.531583623716546 F300
G1 X82.81265269386147 Y20.687022949450746 F300
G1 X82.7760168646971 Y20.838540586169383 F300
G1 X82.72944441893587 Y20.98613542179468 F300
G1 X82.67299817708333 Y21.12977796223958 F300
G1 X82.6066347358206 Y21.26943155187518 F300
G1 X82.530865349953 Y21.403941801730323 F300
G1 X82.44570203036913 Y21.53326573681436 F300
G1 X82.35106880430843 Y21.657310994610835 F300
G1 X82.24680778776255 Y21.775924200362713 F300
G1 X82.13268593750001 Y21.888879947916664 F300
G1 X82.01314642799335 Y21.99205432540639 F300
G1 X81.88467344889438 Y22.088764260563124 F300
G1 X81.74698693228456 Y22.178748184932637 F300
G1 X81.59974548879694 Y22.261656102601933 F300
G1 X81.44255427003837 Y22.337040871226097 F300
G1 X81.27497291666667 Y22.404350292968743 F300
G1 X81.1093431973263 Y22.45913099246276 F300
G1 X80.93458588819429 Y22.50556356614049 F300
G1 X80.75025021191841 Y22.543058457629662 F300
G1 X80.55585717119618 Y22.57091726914496 F300
G1 X80.35090651924631 Y22.58832759949906 F300
G1 X80.13488333333333 Y22.59435833333333 F300
G1 X76.812775 Y22.59435833333333 F300
G1 X76.812775 Y15.352977083333338 F300
G1 X76.81251041666665 Y15.352977083333338 F300
G0 X71.5629125 Y15.352977083333338
G1 X73.64968124999999 Y15.352977083333338 F300
G1 X73.64968124999999 Y20.900760416666667 F300
G1 X75.44937708333333 Y20.900760416666667 F300
G1 X75.44937708333333 Y22.594093750000003 F300
G1 X69.75263333333334 Y22.594093750000003 F300
G1 X69.75263333333334 Y20.900760416666667 F300
G1 X71.5629125 Y20.900760416666667 F300
G1 X71.5629125 Y15.352977083333338 F300
G0 X65.97200208333332 Y15.182585416666669
G1 X66.21346583661169 Y15.188899998264864 F300
G1 X66.44157063299963 Y15.207030240780622 F300
G1 X66.65703203440543 Y15.235858144023286 F300
G1 X66.86054019445206 Y15.274397158810896 F300
G1 X67.05275515000001 Y15.321785883333337 F300
G1 X67.24775506923947 Y15.38183765082554 F300
G1 X67.43047432054813 Y15.45023805662722 F300
G1 X67.60154988636486 Y15.52619147244988 F300
G1 X67.76157494084231 Y15.609018250068061 F300
G1 X67.91109311666666 Y15.698146150000003 F300
G1 X68.05812558829153 Y15.798588755868009 F300
G1 X68.19373987135589 Y15.90445863639428 F300
G1 X68.31844143306293 Y16.015228621630854 F300
G1 X68.43267478659176 Y16.130462566473987 F300
G1 X68.53681788333333 Y16.249804516666668 F300
G1 X68.63453646137535 Y16.37766861799066 F300
G1 X68.72137115108131 Y16.50841100104154 F300
G1 X68.79767667363971 Y16.64170078174629 F300
G1 X68.86373116086946 Y16.777269710121182 F300
G1 X68.91973135 Y16.914899283333334 F300
G1 X68.96665564735984 Y17.057377898534064 F300
G1 X69.00297600979512 Y17.200456603778882 F300
G1 X69.02887237481322 Y17.34394926803774 F300
G1 X69.04442989637852 Y17.487700177970822 F300
G1 X69.04963541666666 Y17.631568750000003 F300
G1 X69.04442850636799 Y17.817073513474625 F300
G1 X69.02924476753273 Y17.990756435555067 F300
G1 X69.0046709421045 Y18.15348905494869 F300
G1 X68.97119893002737 Y18.30609302295228 F300
G1 X68.9292221148376 Y18.4493375060766 F300
G1 X68.87903225642857 Y18.583936009058167 F300
G1 X68.82081719376208 Y18.710542737846733 F300
G1 X68.75465958110497 Y18.829748682815683 F300
G1 X68.68053683484369 Y18.942077655924553 F300
G1 X68.59832239583332 Y19.047982552083337 F300
G1 X68.49847666345215 Y19.157295239179586 F300
G1 X68.38806602055347 Y19.259800963642903 F300
G1 X68.26653792671505 Y19.35572960670539 F300
G1 X68.13322825360923 Y19.445208104031234 F300
G1 X67.9873699425634 Y19.52826260212659 F300
G1 X67.82810184518043 Y19.604822172801498 F300
G1 X67.65447736474499 Y19.67472386779106 F300
G1 X67.46547259547458 Y19.737718831694803 F300
G1 X67.25999374999998 Y19.793479166666664 F300
G1 X67.03035245387441 Y19.84786563937937 F300
G1 X66.84080555555555 Y19.889699305555563 F300
G1 X66.49446597222222 Y19.959813888888892 F300
G1 X66.15271249999999 Y20.027635416666666 F300
G1 X65.9975509404803 Y20.06498698274367 F300
G1 X65.87034104451139 Y20.103190626193406 F300
G1 X65.76699304501801 Y20.142478695164158 F300
G1 X65.68385426219845 Y20.182942716854864 F300
G1 X65.61769192708331 Y20.22461770833333 F300
G1 X65.56427826144959 Y20.268922840071703 F300
G1 X65.52241625922666 Y20.315976306140005 F300
G1 X65.4906993918297 Y20.366481806474262 F300
G1 X65.46822821373144 Y20.421380954530868 F300
G1 X65.45461778187556 Y20.481868572295475 F300
G1 X65.44997916666665 Y20.54939375 F300
G1 X65.45524045089613 Y20.61425843961481 F300
G1 X65.47079868316109 Y20.674598831921415 F300
G1 X65.49681892213438 Y20.731322110921674 F300
G1 X65.53415172012024 Y20.785098166288588 F300
G1 X65.5843168963281 Y20.836277495390657 F300
G1 X65.64945841149755 Y20.884837641903395 F300
G1 X65.73228958333331 Y20.930360677083335 F300
G1 X65.8212931022616 Y20.966888628086622 F300
G1 X65.92935257919972 Y20.9999347143991 F300
G1 X66.05968621933344 Y21.02841806344422 F300
G1 X66.21586233532301 Y21.050971705176238 F300
G1 X66.40180700562911 Y21.065947865727153 F300
G1 X66.62181874999997 Y21.071416666666668 F300
G1 X66.84498938743194 Y21.06556833128432 F300
G1 X67.05707486025786 Y21.049279513492582 F300
G1 X67.25791100630724 Y21.02429152837882 F300
G1 X67.44738734567902 Y20.992169058641984 F300
G1 X67.64013966580129 Y20.95085348606776 F300
G1 X67.81697396948891 Y20.905065970863944 F300
G1 X67.9781375701052 Y20.85645731002792 F300
G1 X68.1239661265432 Y20.806441358024696 F300
G1 X68.31959168624405 Y20.7293359147201 F300
G1 X68.47766346490873 Y20.657097920965462 F300
G1 X68.60169583333331 Y20.59225625 F300
G1 X68.60169583333331 Y22.391687499999996 F300
G1 X68.44301704133261 Y22.454893368214684 F300
G1 X68.25684997955419 Y22.517695234442446 F300
G1 X68.04198449074073 Y22.57848333333333 F300
G1 X67.82566062813657 Y22.629321369454058 F300
G1 X67.58840838310212 Y22.67475331338185 F300
G1 X67.33057870370368 Y22.713068055555553 F300
G1 X67.07203773912713 Y22.74066924207971 F300
G1 X66.7997941948696 Y22.758438683345936 F300
G1 X66.51492708333332 Y22.764749999999996 F300
G1 X66.28603708138779 Y22.759550110474763 F300
G1 X66.06556729556937 Y22.74434920606086 F300
G1 X65.85346294959841 Y22.719698188817997 F300
G1 X65.64965653827511 Y22.68608572892736 F300
G1 X65.45407442239392 Y22.643939333899525 F300
G1 X65.26664358723957 Y22.593626595052083 F300
G1 X65.07630536257606 Y22.531547862672078 F300
G1 X64.89622734240747 Y22.461397017905142 F300
G1 X64.7262121461654 Y22.38357831000622 F300
G1 X64.56607787267028 Y22.29841533057887 F300
G1 X64.41566866682808 Y22.20615344403905 F300
G1 X64.27486536458332 Y22.106962760416664 F300
G1 X64.1382834754818 Y21.996333527421108 F300
G1 X64.01286616476294 Y21.879149939472466 F300
G1 X63.89842779988819 Y21.755478095810084 F300
G1 X63.79486676220419 Y21.6252893190823 F300
G1 X63.70218063658755 Y21.48846759012872 F300
G1 X63.62048050130207 Y21.344818066406244 F300
G1 X63.56009115763143 Y21.21771499343791 F300
G1 X63.50816868788547 Y21.085928248597554 F300
G1 X63.46487032299469 Y20.949219177495277 F300
G1 X63.430444896477724 Y20.807312809677427 F300
G1 X63.40523829336455 Y20.65990436395019 F300
G1 X63.389698039373506 Y20.506665775262864 F300
G1 X63.38437708333332 Y20.34725208333333 F300
G1 X63.3906731076295 Y20.15673143918999 F300
G1 X63.40884222290954 Y19.97829314626086 F300
G1 X63.43792945422982 Y19.811083027321526 F300
G1 X63.47714246052547 Y19.65429426349082 F300
G1 X63.52584832356872 Y19.50717529449411 F300
G1 X63.58356913580246 Y19.369038503086422 F300
G1 X63.6539253231769 Y19.232277121094366 F300
G1 X63.73342070761608 Y19.10469809143952 F300
G1 X63.82182277031803 Y18.985786956844372 F300
G1 X63.9190319149744 Y18.87512122609498 F300
G1 X64.02506983002398 Y18.77237779503839 F300
G1 X64.14006628086419 Y18.677339274691356 F300
G1 X64.26065015100158 Y18.592237539355068 F300
G1 X64.38952030315728 Y18.514689328135184 F300
G1 X64.5268616219429 Y18.444697122020838 F300
G1 X64.6729094480113 Y18.38235018022835 F300
G1 X64.8279381941066 Y18.327825081618137 F300
G1 X64.99224999999998 Y18.281385416666666 F300
G1 X65.35835478515622 Y18.189438574218748 F300
G1 X65.66961640624999 Y18.113540364583333 F300
G1 X65.96703701171873 Y18.041660514322917 F300
G1 X66.29161874999998 Y17.961768749999997 F300
G1 X66.42294679825187 Y17.927049230485142 F300
G1 X66.53816964602238 Y17.89022236493016 F300
G1 X66.63774274691357 Y17.850643750000003 F300
G1 X66.71066083532203 Y17.81440388628259 F300
G1 X66.77289823760975 Y17.775731653898585 F300
G1 X66.82517197634537 Y17.73431752383189 F300
G1 X66.86809683641974 Y17.68977708333334 F300
G1 X66.90350284840238 Y17.639250098546654 F300
G1 X66.92954328815458 Y17.583572424110447 F300
G1 X66.94594840902475 Y17.521286071982654 F300
G1 X66.95175416666665 Y17.45059375 F300
G1 X66.945913694401 Y17.37560962473554 F300
G1 X66.92898119101402 Y17.307019982326057 F300
G1 X66.90137320652552 Y17.243783626477843 F300
G1 X66.86289216029158 Y17.18508482215442 F300
G1 X66.81276381078932 Y17.130397291291672 F300
G1 X66.74970226092091 Y17.07953040709141 F300
G1 X66.67199036458331 Y17.032651302083337 F300
G1 X66.58442294522499 Y16.992953134789893 F300
G1 X66.48088165128605 Y16.95801785093566 F300
G1 X66.35938831742837 Y16.928674572504256 F300
G1 X66.21781634255046 Y16.905989709525524 F300
G1 X66.05392290051866 Y16.891254083764743 F300
G1 X65.86537499999997 Y16.885972916666674 F300
G1 X65.68528418644321 Y16.890739783749215 F300
G1 X65.50609152377847 Y16.904508193860107 F300
G1 X65.32835532132168 Y16.926514235388648 F300
G1 X65.1526329752604 Y16.956033756510426 F300
G1 X64.92004707514727 Y17.006473589216366 F300
G1 X64.69668476701428 Y17.06675414385358 F300
G1 X64.48382005208332 Y17.13491276041667 F300
G1 X64.27374205272923 Y17.212651483459776 F300
G1 X64.08122123766162 Y17.293560491757408 F300
G1 X63.90683408203124 Y17.375654654947922 F300
G1 X63.735363805466285 Y17.465886279361357 F300
G1 X63.589999426039036 Y17.5515950800228 F300
G1 X63.46957291666665 Y17.631304166666673 F300
G1 X63.46957291666665 Y15.736358333333342 F300
G1 X63.613332426352514 Y15.660040248781517 F300
G1 X63.76935345112574 Y15.586732347257467 F300
G1 X63.93845997780786 Y15.516973534974293 F300
G1 X64.12152557927556 Y15.451391567766116 F300
G1 X64.31947132291675 Y15.39070850884503 F300
G1 X64.53326406249998 Y15.335746093750002 F300
G1 X64.73574764527727 Y15.292761062635389 F300
G1 X64.95200285670312 Y15.255659180114232 F300
G1 X65.18286775944 Y15.225199633450753 F300
G1 X65.42921408983118 Y15.202227951929576 F300
G1 X65.69194650667889 Y15.187679893023075 F300
G1 X65.97200208333332 Y15.182585416666669 F300;svg#Layer_1 > g > g > path
G0 X106.81943541666665 Y29.177720833333336
G1 X107.53275208333334 Y31.85054166666667 F300
G1 X107.62879583333333 Y31.85054166666667 F300
G1 X108.34184791666665 Y29.177720833333336 F300
G1 X106.81943541666665 Y29.177720833333336 F300
G0 X109.14062499999999 Y26.195866666666667
G1 X111.28110416666667 Y26.195866666666667 F300
G1 X109.10861041666665 Y33.437247916666664 F300
G1 X106.05267291666665 Y33.437247916666664 F300
G1 X103.8907625 Y26.195866666666667 F300
G1 X106.03097708333331 Y26.195866666666667 F300
G1 X106.42494166666664 Y27.697377083333336 F300
G1 X108.73581249999998 Y27.697377083333336 F300
G1 X109.14062499999999 Y26.195866666666667 F300
G0 X99.97281249999999 Y26.195866666666667
G1 X102.05958125000001 Y26.195866666666667 F300
G1 X102.05958125000001 Y31.743914583333332 F300
G1 X103.8590125 Y31.743914583333332 F300
G1 X103.8590125 Y33.43698333333334 F300
G1 X98.16200416666668 Y33.43698333333334 F300
G1 X98.16200416666668 Y31.743914583333332 F300
G1 X99.97307708333334 Y31.743914583333332 F300
G1 X99.97307708333334 Y26.195866666666667 F300
G1 X99.97281249999999 Y26.195866666666667 F300
G0 X93.62598750000001 Y26.195866666666667
G1 X98.30064583333333 Y26.195866666666667 F300
G1 X98.30064583333333 Y27.910366666666672 F300
G1 X95.71275625 Y27.910366666666672 F300
G1 X95.71275625 Y33.43698333333334 F300
G1 X93.62598750000001 Y33.43698333333334 F300
G1 X93.62598750000001 Y26.195866666666667 F300
G0 X88.42957083333332 Y26.025475000000004
G1 X88.6357531045116 Y26.02956358498301 F300
G1 X88.83689163867771 Y26.041788697883238 F300
G1 X89.03281409840162 Y26.06210746490097 F300
G1 X89.22336071053272 Y26.09050291026688 F300
G1 X89.40837888333333 Y26.12698610000001 F300
G1 X89.59377473446551 Y26.173275628783284 F300
G1 X89.7720629005512 Y26.228053046538626 F300
G1 X89.94321947190568 Y26.291332995062653 F300
G1 X90.10721089712993 Y26.36318507404554 F300
G1 X90.26398423333333 Y26.4437368 F300
G1 X90.41611159051223 Y26.534889084999907 F300
G1 X90.56003597273332 Y26.635140919334138 F300
G1 X90.69575669290442 Y26.744799547981824 F300
G1 X90.82320085977854 Y26.864269445695847 F300
G1 X90.94220868333332 Y26.9940532 F300
G1 X91.03252335028884 Y27.107520413470382 F300
G1 X91.11680149954734 Y27.22840590664265 F300
G1 X91.19486620091986 Y27.357174759865316 F300
G1 X91.26646683027458 Y27.494347971457426 F300
G1 X91.3312738195316 Y27.640500856973482 F300
G1 X91.38887403333334 Y27.7962614 F300
G1 X91.43515585945345 Y27.94893597831775 F300
G1 X91.47445500258938 Y28.111043023972748 F300
G1 X91.50623885881575 Y28.283294794212658 F300
G1 X91.52988430725387 Y28.466447104737767 F300
G1 X91.54467553899639 Y28.66129811130897 F300
G1 X91.54980208333333 Y28.868687499999997 F300
G1 X91.54980208333333 Y33.437247916666664 F300
G1 X89.46276875000001 Y33.437247916666664 F300
G1 X89.46276875000001 Y29.060775 F300
G1 X89.4580277274021 Y28.918461326740363 F300
G1 X89.44466000411907 Y28.78999689334639 F300
G1 X89.42380725385448 Y28.674070058620263 F300
G1 X89.39642666607935 Y28.56946263891854 F300
G1 X89.36329592477067 Y28.475052993118396 F300
G1 X89.3250188271605 Y28.389821064814818 F300
G1 X89.27630178796024 Y28.303709051810884 F300
G1 X89.22222432213988 Y28.227245264615988 F300
G1 X89.16316810019173 Y28.159579739567942 F300
G1 X89.09935569400727 Y28.100003913907155 F300
G1 X89.03086875020516 Y28.047956831441496 F300
G1 X88.95766936728394 Y28.00302962962963 F300
G1 X88.86444151637374 Y27.958586631680035 F300
G1 X88.76513720666597 Y27.92400266237782 F300
G1 X88.65966245970021 Y27.899125122011487 F300
G1 X88.54786407808106 Y27.88400446679652 F300
G1 X88.42957083333333 Y27.87888125 F300
G1 X88.31121750111134 Y27.88400623765292 F300
G1 X88.19939705565103 Y27.899130335264683 F300
G1 X88.09393210285108 Y27.924010310482803 F300
G1 X87.99466358531622 Y27.958593257842864 F300
G1 X87.90149189814817 Y28.003029629629633 F300
G1 X87.82833685067277 Y28.047955430240123 F300
G1 X87.75989975488626 Y28.100000915447193 F300
G1 X87.69614083153408 Y28.159575403013438 F300
G1 X87.6371400437752 Y28.227240460720186 F300
G1 X87.58311839559856 Y28.303705402535098 F300
G1 X87.53445601851854 Y28.389821064814818 F300
G1 X87.49623046965331 Y28.47504574454868 F300
G1 X87.46314559902726 Y28.569451020401686 F300
G1 X87.43580420338847 Y28.67405706391323 F300
G1 X87.41498246076625 Y28.789985488172725 F300
G1 X87.40163545726661 Y28.91845433228842 F300
G1 X87.39690208333334 Y29.060775 F300
G1 X87.39690208333334 Y33.437247916666664 F300
G1 X85.30960416666666 Y33.437247916666664 F300
G1 X85.30960416666666 Y28.868687499999997 F300
G1 X85.31473088629512 Y28.66126859947483 F300
G1 X85.32952244229476 Y28.466393842421475 F300
G1 X85.35316807796005 Y28.283222966856748 F300
G1 X85.38495171970011 Y28.11095728049744 F300
G1 X85.42425000277383 Y27.948840466816286 F300
G1 X85.47053010000002 Y27.7961598 F300
G1 X85.52813009008882 Y27.640389236709236 F300
G1 X85.59293622044838 Y27.494230074295828 F300
G1 X85.66453514010574 Y27.35705386979889 F300
G1 X85.74259709009745 Y27.228284879856893 F300
G1 X85.82687127929218 Y27.107401707384636 F300
G1 X85.91718063333333 Y26.9939389 F300
G1 X86.0361840333728 Y26.864158726610345 F300
G1 X86.16362216186965 Y26.744694902032663 F300
G1 X86.29933502421974 Y26.63504435269453 F300
G1 X86.4432495444677 Y26.534802145782283 F300
G1 X86.59536486666667 Y26.4436606 F300
G1 X86.75212710020503 Y26.36311866119089 F300
G1 X86.91610535392257 Y26.291276922364116 F300
G1 X87.08724647545908 Y26.22800750658851 F300
G1 X87.26551670010386 Y26.1732404423352 F300
G1 X87.45089189999999 Y26.126960700000005 F300
G1 X87.6358905251012 Y26.090485476402904 F300
G1 X87.82641471947949 Y26.06209697561549 F300
G1 X88.02231162460313 Y26.04178372316761 F300
G1 X88.22342119839603 Y26.02956226066041 F300
G1 X88.42957083333332 Y26.025475000000004 F300
G0 X84.32985208333332 Y26.195866666666667
G1 X81.88086874999999 Y29.933635416666668 F300
G1 X84.29836666666667 Y33.437247916666664 F300
G1 X81.75360416666666 Y33.437247916666664 F300
G1 X79.72980625 Y30.104027083333335 F300
G1 X79.72980625 Y33.437247916666664 F300
G1 X77.64303749999999 Y33.437247916666664 F300
G1 X77.64303749999999 Y26.195866666666667 F300
G1 X79.72980625 Y26.195866666666667 F300
G1 X79.72980625 Y29.678047916666667 F300
G1 X81.82768749999998 Y26.195866666666667 F300
G1 X84.32985208333332 Y26.195866666666667 F300
G0 X72.062975 Y29.177720833333336
G1 X72.77655625 Y31.85054166666667 F300
G1 X72.87207083333331 Y31.85054166666667 F300
G1 X73.58618125 Y29.177720833333336 F300
G1 X72.062975 Y29.177720833333336 F300
G0 X74.38416458333333 Y26.195866666666667
G1 X76.52464375 Y26.195866666666667 F300
G1 X74.35214999999998 Y33.437247916666664 F300
G1 X71.29621249999998 Y33.437247916666664 F300
G1 X69.13509583333332 Y26.195866666666667 F300
G1 X71.27504583333331 Y26.195866666666667 F300
G1 X71.66927499999998 Y27.697377083333336 F300
G1 X73.97961666666664 Y27.697377083333336 F300
G1 X74.38416458333333 Y26.195866666666667 F300
G0 X63.72516041666666 Y33.437247916666664
G1 X63.72516041666666 Y26.195866666666667 F300
G1 X65.81245833333334 Y26.195866666666667 F300
G1 X65.81245833333334 Y28.996745833333335 F300
G1 X68.64482291666667 Y28.996745833333335 F300
G1 X68.64482291666667 Y30.60461875 F300
G1 X65.81245833333334 Y30.60461875 F300
G1 X65.81245833333334 Y31.786512499999997 F300
G1 X68.6768375 Y31.786512499999997 F300
G1 X68.6768375 Y33.437247916666664 F300
G1 X63.72516041666666 Y33.437247916666664 F300;svg#Layer_1 > g > path
G0 X55.904077083333334 Y4.510087500000005
G1 X5.290079166666666 Y4.510087500000005 F300
G1 X5.290079166666666 Y55.12408541666667 F300
G1 X55.904077083333334 Y55.12408541666667 F300
G1 X55.904077083333334 Y4.510087500000005 F300
G0 X5.776647916666666 Y4.99692083333334
G1 X55.41724374999999 Y4.99692083333334 F300
G1 X55.41724374999999 Y54.63725208333333 F300
G1 X5.776647916666666 Y54.63725208333333 F300
G1 X5.776647916666666 Y4.99692083333334 F300;svg#Layer_1 > g > g > path
G0 X46.31240208333333 Y33.175045833333336
G1 X47.60912499999999 Y34.121725 F300
G1 X47.42601040976935 Y34.32275478911821 F300
G1 X47.24349977213541 Y34.53990309244791 F300
G1 X47.12862195303709 Y34.691388436302255 F300
G1 X47.01918437992136 Y34.8522047106565 F300
G1 X46.91714036458333 Y35.02378880208333 F300
G1 X46.848826807991955 Y35.15609929468221 F300
G1 X46.78637109555903 Y35.29561516140872 F300
G1 X46.73066379955268 Y35.44317978478873 F300
G1 X46.68270712890625 Y35.59969990234375 F300
G1 X46.64556620384627 Y35.75653058814483 F300
G1 X46.61732031844207 Y35.92366958901745 F300
G1 X46.59925305711279 Y36.10236263692471 F300
G1 X46.59286041666667 Y36.29395416666667 F300
G1 X46.59884380568287 Y36.43815353382208 F300
G1 X46.61649396498348 Y36.58360270029629 F300
G1 X46.64544782209353 Y36.72989427972435 F300
G1 X46.68544391276042 Y36.876583203125 F300
G1 X46.735030772485295 Y37.01984146555127 F300
G1 X46.794093886555075 Y37.16070143942404 F300
G1 X46.86221533197117 Y37.298595755528765 F300
G1 X46.93903463541666 Y37.432919270833324 F300
G1 X47.02384165300384 Y37.56244678935123 F300
G1 X47.11548703247777 Y37.68555695790873 F300
G1 X47.213480497424165 Y37.80171977884778 F300
G1 X47.31739293619791 Y37.91037643229167 F300
G1 X47.428676875646914 Y38.012493819320746 F300
G1 X47.5438450628878 Y38.10443623566446 F300
G1 X47.662488222702926 Y38.18586120620145 F300
G1 X47.78427916666666 Y38.25636875 F300
G1 X47.69412147970641 Y38.35865451457621 F300
G1 X47.59424027701562 Y38.4594937269092 F300
G1 X47.48398254286987 Y38.55778431174905 F300
G1 X47.362621527777776 Y38.652283410493844 F300
G1 X47.23686881382426 Y38.736919294677726 F300
G1 X47.10060295292837 Y38.81508892037791 F300
G1 X46.952959498107575 Y38.88554709309378 F300
G1 X46.79297361111111 Y38.946833256172845 F300
G1 X46.664787755456906 Y38.98561521712385 F300
G1 X46.52881980272387 Y39.017481317329526 F300
G1 X46.384409934486705 Y39.04157547017661 F300
G1 X46.23085237980577 Y39.05689732802379 F300
G1 X46.067397916666664 Y39.06228958333333 F300
G1 X45.90875895011261 Y39.056402766789944 F300
G1 X45.7549083186722 Y39.03924476768113 F300
G1 X45.60590309030424 Y39.01146516332418 F300
G1 X45.46180252911586 Y38.97358135777459 F300
G1 X45.32268678385417 Y38.925987825520835 F300
G1 X45.18610933370097 Y38.86776001842748 F300
G1 X45.056401739314744 Y38.80070066114043 F300
G1 X44.933638962342044 Y38.72520267396363 F300
G1 X44.81794073042572 Y38.64154888367708 F300
G1 X44.70949010416666 Y38.54992395833333 F300
G1 X44.608045951013644 Y38.44988863433586 F300
G1 X44.51551477217296 Y38.34312151152219 F300
G1 X44.4320476567096 Y38.22975973413952 F300
G1 X44.35789797324138 Y38.10984896216604 F300
G1 X44.29344108072917 Y37.98336009114583 F300
G1 X44.24013907024202 Y37.8528406344622 F300
G1 X44.197606166615905 Y37.716988997103726 F300
G1 X44.16630230523455 Y37.57563894535875 F300
G1 X44.1468742002815 Y37.42857555692514 F300
G1 X44.140172916666664 Y37.275558333333336 F300
G1 X44.14629138357052 Y37.134994453010904 F300
G1 X44.1639390335186 Y36.99903990220823 F300
G1 X44.19219210861306 Y36.86756778429543 F300
G1 X44.23029491647229 Y36.740468283683285 F300
G1 X44.27763865740741 Y36.61766697530865 F300
G1 X44.33453270746833 Y36.49761302874835 F300
G1 X44.39915338342109 Y36.38340515057661 F300
G1 X44.470833485603926 Y36.27508146788883 F300
G1 X44.54899271968894 Y36.17271548764453 F300
G1 X44.63312106481481 Y36.07642746913581 F300
G1 X44.74770968146058 Y35.963320893296796 F300
G1 X44.86800241270188 Y35.862586924335375 F300
G1 X44.9928471210037 Y35.774299872735895 F300
G1 X45.121247916666654 Y35.698641666666674 F300
G1 X45.127432718657154 Y35.502008099407256 F300
G1 X45.14551192483451 Y35.30965477974411 F300
G1 X45.175006547460264 Y35.12137532190207 F300
G1 X45.21553110140778 Y34.936974447238306 F300
G1 X45.26678834876544 Y34.75627422839507 F300
G1 X45.32882854323967 Y34.578426219370954 F300
G1 X45.40103557540427 Y34.404680161184224 F300
G1 X45.48319968380438 Y34.23495059223815 F300
G1 X45.57517091181559 Y34.06917816982144 F300
G1 X45.676853317901234 Y33.90733410493827 F300
G1 X45.7864441813976 Y33.751781545097245 F300
G1 X45.90487871472974 Y33.60072120465604 F300
G1 X46.03205707584604 Y33.45419301237998 F300
G1 X46.16791163547022 Y33.312266945930425 F300
G1 X46.31240208333333 Y33.175045833333336 F300
G0 X39.37529166666666 Y40.07828958333334
G1 X40.46114166666666 Y42.00577916666666 F300
G1 X38.8493 Y42.00577916666666 F300
G1 X38.842965894502704 Y41.918401489110714 F300
G1 X38.82439460150706 Y41.83055126180325 F300
G1 X38.79395660807292 Y41.742981770833325 F300
G1 X38.753302584470205 Y41.65945878441064 F300
G1 X38.70293143813423 Y41.580247371207705 F300
G1 X38.643288802083326 Y41.50637812499999 F300
G1 X38.57562854469967 Y41.43994938449842 F300
G1 X38.50119641169507 Y41.382648834764694 F300
G1 X38.42034013671875 Y41.335457291666664 F300
G1 X38.35610119599703 Y41.30765160985676 F300
G1 X38.28938109979595 Y41.28707192656735 F300
G1 X38.220106039171384 Y41.27419452619105 F300
G1 X38.148154166666664 Y41.269708333333334 F300
G1 X38.04278868820511 Y41.27588414377246 F300
G1 X37.946755233258344 Y41.293491346279566 F300
G1 X37.859329582228824 Y41.32148087263071 F300
G1 X37.779893364197534 Y41.359235493827164 F300
G1 X37.70607989917399 Y41.40802969072475 F300
G1 X37.64088039516222 Y41.46627812203866 F300
G1 X37.58408759850545 Y41.534189112114866 F300
G1 X37.53586913580247 Y41.61233395061729 F300
G1 X37.49914316721693 Y41.69521957561847 F300
G1 X37.47147370820667 Y41.78777072526954 F300
G1 X37.453809342933624 Y41.890936157551536 F300
G1 X37.447537499999996 Y42.00577916666666 F300
G1 X36.01058541666666 Y42.00577916666666 F300
G1 X36.00384437467903 Y41.90038484655439 F300
G1 X35.984774030168595 Y41.80245893869519 F300
G1 X35.95473080828026 Y41.711691277437964 F300
G1 X35.91462006172839 Y41.62785617283951 F300
G1 X35.863647549029885 Y41.549127997637946 F300
G1 X35.804387624813444 Y41.47938593188511 F300
G1 X35.7374158932484 Y41.41859950628701 F300
G1 X35.66302091049383 Y41.36699660493827 F300
G1 X35.582677430849245 Y41.325736287224714 F300
G1 X35.49709503337461 Y41.29534210676364 F300
G1 X35.40630497870942 Y41.276341158766265 F300
G1 X35.31023333333333 Y41.269708333333334 F300
G1 X35.214092615231564 Y41.27634070746932 F300
G1 X35.12322295123362 Y41.29534122857758 F300
G1 X35.037554554638106 Y41.325735649863844 F300
G1 X34.95712237654321 Y41.36699660493827 F300
G1 X34.88263343539859 Y41.418604566073 F300
G1 X34.81557578328498 Y41.47939397529992 F300
G1 X34.75623912012398 Y41.549134941844656 F300
G1 X34.705199845679005 Y41.62785617283951 F300
G1 X34.665027072359784 Y41.711698101547 F300
G1 X34.634938130997625 Y41.802467518910035 F300
G1 X34.61583885988107 Y41.90039073037754 F300
G1 X34.609087499999994 Y42.00577916666666 F300
G1 X32.99698125 Y42.00577916666666 F300
G1 X33.94366041666666 Y40.14866875 F300
G1 X34.3115380908048 Y40.180890076432874 F300
G1 X34.67175653091473 Y40.20704145754457 F300
G1 X35.02550859374999 Y40.22725 F300
G1 X35.379597271571406 Y40.241826490726964 F300
G1 X35.73104717017988 Y40.250545272459064 F300
G1 X36.080964583333326 Y40.25344375 F300
G1 X36.73097097135653 Y40.24745756824935 F300
G1 X37.33230019604803 Y40.230794865264315 F300
G1 X37.8856875 Y40.20525651041667 F300
G1 X38.43922287361494 Y40.16891476395679 F300
G1 X38.93495121734512 Y40.12599612041193 F300
G1 X39.37529166666666 Y40.07828958333334 F300
G0 X36.431272916666664 Y22.978533333333335
G1 X36.37464042721055 Y23.08367834856546 F300
G1 X36.317900674387 Y23.19869307724187 F300
G1 X36.26260594135803 Y23.326362422839512 F300
G1 X36.21497924343422 Y23.45646389463426 F300
G1 X36.17102687534697 Y23.604771891823695 F300
G1 X36.132862114197536 Y23.77537993827161 F300
G1 X36.112152964350365 Y23.902007747354638 F300
G1 X36.0957797314114 Y24.043485112250828 F300
G1 X36.08492420585527 Y24.202007220047744 F300
G1 X36.08096458333333 Y24.380031250000002 F300
G1 X36.08595600657531 Y24.532264418970282 F300
G1 X36.10082657422098 Y24.68055370684469 F300
G1 X36.12548839122783 Y24.82515340244085 F300
G1 X36.15994620451112 Y24.966303070742715 F300
G1 X36.20429971623766 Y25.104220402769652 F300
G1 X36.258744984567905 Y25.239094135802475 F300
G1 X36.32214878509044 Y25.368417650501883 F300
G1 X36.39576160022988 Y25.494878497955305 F300
G1 X36.48002339623992 Y25.618600814148092 F300
G1 X36.5754744398843 Y25.73965530068739 F300
G1 X36.682752755930665 Y25.8580536920873 F300
G1 X36.802591126543206 Y25.973744058641977 F300
G1 X36.924175229290796 Y26.077310785789237 F300
G1 X37.05768978207004 Y26.17834813092883 F300
G1 X37.20394427735542 Y26.276695212915584 F300
G1 X37.36381705034485 Y26.372129528224818 F300
G1 X37.53825279365648 Y26.464365635625825 F300
G1 X37.728260416666664 Y26.553054166666666 F300
G1 X37.999077093836185 Y26.68410062407163 F300
G1 X38.256426627604164 Y26.81236650390625 F300
G1 X38.77481979166666 Y27.078351302083334 F300
G1 X39.339250455729164 Y27.370678678385417 F300
G1 X40.00552916666666 Y27.70901875 F300
G1 X40.23687584598579 Y27.834534092481608 F300
G1 X40.45567205654474 Y27.965759883577615 F300
G1 X40.662572523452745 Y28.10238345715157 F300
G1 X40.8581922479745 Y28.24413614043926 F300
G1 X41.04310671883081 Y28.390791267208062 F300
G1 X41.21785211666667 Y28.54216203333334 F300
G1 X41.388899914373035 Y28.704000505359456 F300
G1 X41.54994208116882 Y28.870507614011522 F300
G1 X41.70141469587033 Y29.04152603462674 F300
G1 X41.843720114118696 Y29.216926763754998 F300
G1 X41.97722755575148 Y29.396606766333534 F300
G1 X42.10227376666667 Y29.580486516666667 F300
G1 X42.24294555736685 Y29.80893426613748 F300
G1 X42.37187636793439 Y30.042944246815498 F300
G1 X42.489506857925676 Y30.28235849627893 F300
G1 X42.596231006906066 Y30.527044025156286 F300
G1 X42.69239831666666 Y30.776887900000002 F300
G1 X42.777832977419266 Y31.030255145217545 F300
G1 X42.85321799875845 Y31.287852492045374 F300
G1 X42.91884165837966 Y31.549500913812587 F300
G1 X42.974966244908245 Y31.815027438479866 F300
G1 X43.021829966666665 Y32.08426188333333 F300
G1 X43.059291924361204 Y32.35410078843624 F300
G1 X43.088015677700426 Y32.626385550363935 F300
G1 X43.108249400063556 Y32.90087569482997 F300
G1 X43.12022769684949 Y33.1773299369775 F300
G1 X43.124172916666666 Y33.455504166666664 F300
G1 X43.11982018884106 Y33.68943337421301 F300
G1 X43.107301763781564 Y33.91366073433582 F300
G1 X43.087380179354206 Y34.12878559095794 F300
G1 X43.06075780719225 Y34.335380988945154 F300
G1 X43.02808016975309 Y34.533994830246925 F300
G1 X42.97659437891243 Y34.785161177585906 F300
G1 X42.91673022694254 Y35.024672785984905 F300
G1 X42.84961830282902 Y35.25340770115809 F300
G1 X42.77629483024691 Y35.47219753086421 F300
G1 X42.66576103980749 Y35.76142763410439 F300
G1 X42.54743657795697 Y36.03473860375957 F300
G1 X42.423556250000004 Y36.29368958333333 F300
G1 X42.524519290123465 Y35.69028279320989 F300
G1 X42.56779176682041 Y35.399915418439996 F300
G1 X42.60225779320988 Y35.11010054012346 F300
G1 X42.61879644317875 Y34.91624777179441 F300
G1 X42.62953357887362 Y34.71578946488597 F300
G1 X42.63337083333334 Y34.50669374999999 F300
G1 X42.62871808442424 Y34.199983141211604 F300
G1 X42.61480460039123 Y33.90351255056366 F300
G1 X42.59168993789817 Y33.61691043697947 F300
G1 X42.55942140971889 Y33.339813724453194 F300
G1 X42.51803144172496 Y33.07186870913162 F300
G1 X42.467534960937506 Y32.81273203124999 F300
G1 X42.404808557854814 Y32.55014280534185 F300
G1 X42.331988176698026 Y32.29635683967844 F300
G1 X42.24897441896565 Y32.05098686503693 F300
G1 X42.15562517138834 Y31.813668528158082 F300
G1 X42.05175249993062 Y31.584062445731995 F300
G1 X41.937119791666674 Y31.36185624999999 F300
G1 X41.82949547328779 Y31.176106193691936 F300
G1 X41.71333320916317 Y30.99529883256195 F300
G1 X41.58833733026984 Y30.819273323686428 F300
G1 X41.4541742685402 Y30.647892351792446 F300
G1 X41.31047185780215 Y30.48104305043698 F300
G1 X41.15681875970482 Y30.318637792838878 F300
G1 X40.99276399739584 Y30.160614843749997 F300
G1 X40.82655844115369 Y30.014290199641586 F300
G1 X40.64973531341225 Y29.871662142627045 F300
G1 X40.46172686511815 Y29.732748170855395 F300
G1 X40.261926004982485 Y29.59759369251586 F300
G1 X40.049686234151466 Y29.46627189039016 F300
G1 X39.82432154241382 Y29.338883461447885 F300
G1 X39.58510625 Y29.215556249999995 F300
G1 X39.07649447736492 Y28.964608038609 F300
G1 X38.652098600260416 Y28.760270345052078 F300
G1 X37.90311692708333 Y28.409933072916658 F300
G1 X37.25925751953125 Y28.112032910156245 F300
G1 X36.953475535005055 Y27.96700331843098 F300
G1 X36.64161666666667 Y27.814058333333328 F300
G1 X36.43987350018635 Y27.702669194509276 F300
G1 X36.25213033643092 Y27.589794058044248 F300
G1 X36.07784363035515 Y27.47552059020758 F300
G1 X35.916486301311984 Y27.35991423052049 F300
G1 X35.76755133542171 Y27.24301729223046 F300
G1 X35.63055555555557 Y27.124848148148146 F300
G1 X35.49406160876404 Y26.99434970243797 F300
G1 X35.37088058498183 Y26.86247523984828 F300
G1 X35.26044965220441 Y26.729138464526464 F300
G1 X35.162269271811105 Y26.5942113974896 F300
G1 X35.07591074377646 Y26.45752468309241 F300
G1 X35.00102361111111 Y26.318868518518517 F300
G1 X34.93528974102652 Y26.172959164602076 F300
G1 X34.881420055437104 Y26.024477728257473 F300
G1 X34.83929598935001 Y25.87302603313655 F300
G1 X34.808932110724726 Y25.718165583696557 F300
G1 X34.79048185061044 Y25.55942301470305 F300
G1 X34.78424166666666 Y25.396295833333333 F300
G1 X34.79044011439208 Y25.188130214713592 F300
G1 X34.80846759134418 Y24.989683220840543 F300
G1 X34.837562848952786 Y24.800635432320227 F300
G1 X34.877083724588736 Y24.62067063230196 F300
G1 X34.926504606424075 Y24.449487170954175 F300
G1 X34.98541319444444 Y24.28680972222223 F300
G1 X35.05736084122529 Y24.12445800528272 F300
G1 X35.13865322916293 Y23.97210435308604 F300
G1 X35.22896398129896 Y23.829443862402737 F300
G1 X35.32809316105193 Y23.69623452651686 F300
G1 X35.43595957194577 Y23.572312290738754 F300
G1 X35.55259166666667 Y23.45760555555556 F300
G1 X35.659471479178514 Y23.36677155992821 F300
G1 X35.77232251401439 Y23.283265848033217 F300
G1 X35.89124381198596 Y23.20709814543165 F300
G1 X36.01638571636676 Y23.138347236200463 F300
G1 X36.14794352636286 Y23.077166634083643 F300
G1 X36.28615086707764 Y23.023789578116357 F300
G1 X36.431272916666664 Y22.978533333333335 F300
G0 X35.064699999999995 Y23.434410416666665
G1 X34.97101824207063 Y23.533856428254342 F300
G1 X34.87441225895921 Y23.649015634004673 F300
G1 X34.77636617838541 Y23.78094430338541 F300
G1 X34.686511132552894 Y23.917995933228177 F300
G1 X34.599591905381146 Y24.06939310051203 F300
G1 X34.51737630208333 Y24.235800260416667 F300
G1 X34.463189119084895 Y24.362896461465375 F300
G1 X34.41345586819258 Y24.497333653416717 F300
G1 X34.36895882215305 Y24.639358502697988 F300
G1 X34.330568066406244 Y24.789230045572914 F300
G1 X34.30066602355007 Y24.93892556796512 F300
G1 X34.278103337405994 Y25.0956590924383 F300
G1 X34.26379733409699 Y25.25973951127975 F300
G1 X34.25877916666666 Y25.431485416666668 F300
G1 X34.2640855621246 Y25.59674317623524 F300
G1 X34.279804675577374 Y25.7585642531888 F300
G1 X34.30570108538122 Y25.91723429209169 F300
G1 X34.34162442075666 Y26.073025702597143 F300
G1 X34.387507327099534 Y26.226193496793528 F300
G1 X34.44336278269652 Y26.376971194146435 F300
G1 X34.50928078703704 Y26.525566898148153 F300
G1 X34.58290690872165 Y26.66764128918353 F300
G1 X34.6661406585369 Y26.807648430127305 F300
G1 X34.75917328700397 Y26.945695350746345 F300
G1 X34.86224635226922 Y27.081861481101942 F300
G1 X34.975647921057714 Y27.216196831879248 F300
G1 X35.09970863179873 Y27.34872045970041 F300
G1 X35.234797685185185 Y27.479419212962966 F300
G1 X35.39321692064398 Y27.618194821018825 F300
G1 X35.56501463996098 Y27.754355461268002 F300
G1 X35.750685602825264 Y27.88778763787033 F300
G1 X35.95075737629719 Y28.018335230563416 F300
G1 X36.16578534888372 Y28.145798857253716 F300
G1 X36.39634791666667 Y28.269935416666662 F300
G1 X36.83092914260596 Y28.47223326233763 F300
G1 X37.211037207031254 Y28.645585872395827 F300
G1 X37.92057942708333 Y28.962151562499997 F300
G1 X38.603878287760416 Y29.265521158854163 F300
G1 X39.3398375 Y29.60158333333333 F300
G1 X39.56230798058585 Y29.71642253969907 F300
G1 X39.771221579532316 Y29.834911692692174 F300
G1 X39.96736549798612 Y29.956790457425267 F300
G1 X40.15148264445177 Y30.081834524066405 F300
G1 X40.324272411013894 Y30.209854686855625 F300
G1 X40.48639138333335 Y30.340695816666674 F300
G1 X40.6473756104484 Y30.482428380232985 F300
G1 X40.79782069672059 Y30.627184955121145 F300
G1 X40.9382899495662 Y30.77484888610915 F300
G1 X41.069307363304354 Y30.925330910541142 F300
G1 X41.191358525221624 Y31.078567603872774 F300
G1 X41.30489156666667 Y31.234519699999996 F300
G1 X41.433601168374224 Y31.43026911379048 F300
G1 X41.55065115831322 Y31.63001330949004 F300
G1 X41.65662699923156 Y31.833696260529983 F300
G1 X41.75205909194514 Y32.04129004450034 F300
G1 X41.837425849999995 Y32.252790883333326 F300
G1 X41.91313430269793 Y32.468145637548986 F300
G1 X41.97950356155668 Y32.68711800301317 F300
G1 X42.0368974939019 Y32.90965481789228 F300
G1 X42.08565286099189 Y33.13571066928277 F300
G1 X42.12608203333333 Y33.36524526666666 F300
G1 X42.16490578695502 Y33.653056627373644 F300
G1 X42.191954013685375 Y33.94520340042236 F300
G1 X42.207787680961346 Y34.24146560343535 F300
G1 X42.212947916666664 Y34.54161875 F300
G1 X42.20782755232455 Y34.83790128044388 F300
G1 X42.19338507943308 Y35.11211283842207 F300
G1 X42.17089782806019 Y35.365989621016006 F300
G1 X42.14151468022397 Y35.601156691557385 F300
G1 X42.10626295572917 Y35.81913457031249 F300
G1 X42.06040461587665 Y36.047005628498994 F300
G1 X42.00913617726953 Y36.257367289919536 F300
G1 X41.95344133622095 Y36.45169577984267 F300
G1 X41.894190144531024 Y36.6313654148853 F300
G1 X41.83214635416667 Y36.79765468749999 F300
G1 X41.74200216331676 Y37.00987467775402 F300
G1 X41.64896581136471 Y37.2017079899733 F300
G1 X41.554411905392506 Y37.37539862084594 F300
G1 X41.45950553385417 Y37.53298964843749 F300
G1 X41.32068239441145 Y37.74023884984099 F300
G1 X41.18581493766425 Y37.921534211064596 F300
G1 X41.05724791666667 Y38.080949999999994 F300
G1 X41.14786130889841 Y37.89402375879665 F300
G1 X41.22727803879386 Y37.702544834695075 F300
G1 X41.29624569996512 Y37.50723393021473 F300
G1 X41.35545293209878 Y37.30878804012346 F300
G1 X41.40566784163123 Y37.10731915495779 F300
G1 X41.44700729061876 Y36.905719659968256 F300
G1 X41.48020568853615 Y36.70482899647784 F300
G1 X41.50596165123457 Y36.50546404320988 F300
G1 X41.53028297197369 Y36.237611301262035 F300
G1 X41.54350626074168 Y35.97962297337276 F300
G1 X41.54752083333334 Y35.733302083333335 F300
G1 X41.54253149762895 Y35.411509445168555 F300
G1 X41.52708789462291 Y35.09681149223897 F300
G1 X41.500484119179646 Y34.78933666139417 F300
G1 X41.46201808333335 Y34.48920373333334 F300
G1 X41.42118832908695 Y34.24896257276649 F300
G1 X41.37160203512253 Y34.01406267209271 F300
G1 X41.312867917981606 Y33.784461085432504 F300
G1 X41.24457077855973 Y33.56012118005655 F300
G1 X41.166266833333346 Y33.34101578333333 F300
G1 X41.09256533930341 Y33.161356838104425 F300
G1 X41.011197019408954 Y32.98536882891789 F300
G1 X40.92180572712023 Y32.812996215933666 F300
G1 X40.82400091265493 Y32.6441999201225 F300
G1 X40.717355281365705 Y32.47895948233561 F300
G1 X40.60140258333333 Y32.317275133333325 F300
G1 X40.479618074577424 Y32.163934251813956 F300
G1 X40.347931988731844 Y32.01380975976539 F300
G1 X40.20570699369087 Y31.866926058073552 F300
G1 X40.05224881837722 Y31.72334378418376 F300
G1 X39.88680452560082 Y31.583161757106577 F300
G1 X39.70856083333334 Y31.446518683333334 F300
G1 X39.53101555593677 Y31.323088338353724 F300
G1 X39.34049283983249 Y31.20275484181998 F300
G1 X39.136053263478956 Y31.085728241590786 F300
G1 X38.916693905443125 Y30.97226455222456 F300
G1 X38.68134677735763 Y30.862666363237114 F300
G1 X38.42887708333333 Y30.757283333333334 F300
G1 X37.966230651475676 Y30.57167996632113 F300
G1 X37.556731868489585 Y30.418476106770832 F300
G1 X37.158810966463875 Y30.277319018374264 F300
G1 X36.78650911458334 Y30.148675520833333 F300
G1 X36.41859301295793 Y30.020370440488612 F300
G1 X36.04907815755209 Y29.88552259114583 F300
G1 X35.803828558061504 Y29.7905823653851 F300
G1 X35.546941307187915 Y29.685271447700316 F300
G1 X35.275308333333335 Y29.566658333333333 F300
G1 X35.013715168064905 Y29.43853654869364 F300
G1 X34.77487344446771 Y29.311039228909127 F300
G1 X34.55711619971191 Y29.184005982725584 F300
G1 X34.35887567245421 Y29.05728690928249 F300
G1 X34.178680696614585 Y28.930736425781248 F300
G1 X34.02633692263093 Y28.813269078883792 F300
G1 X33.88672063333412 Y28.69515578007979 F300
G1 X33.75901401403471 Y28.57623776949097 F300
G1 X33.6424583822201 Y28.456345136664858 F300
G1 X33.53635385927852 Y28.33529412228134 F300
G1 X33.440059114583335 Y28.212884635416664 F300
G1 X33.34855807243931 Y28.08217844298852 F300
G1 X33.266378024822245 Y27.94889691814056 F300
G1 X33.19309973867503 Y27.81272958512205 F300
G1 X33.1283625744517 Y27.67334320952042 F300
G1 X33.07186299918773 Y27.53038089074493 F300
G1 X33.02335276692708 Y27.38346136067708 F300
G1 X32.97639912330854 Y27.205648787691057 F300
G1 X32.93981753487306 Y27.02045233810567 F300
G1 X32.91359304095335 Y26.82712093940802 F300
G1 X32.897775356079904 Y26.62485901850302 F300
G1 X32.892470833333334 Y26.412825 F300
G1 X32.89876231165347 Y26.212641314853567 F300
G1 X32.917428646342195 Y26.0150141625387 F300
G1 X32.948110349064436 Y25.820169083038778 F300
G1 X32.9905413714388 Y25.628334913212687 F300
G1 X33.04454423828125 Y25.439757779947918 F300
G1 X33.11013910544954 Y25.254420338037946 F300
G1 X33.186568053016806 Y25.074388714695953 F300
G1 X33.27362661044397 Y24.89990446249282 F300
G1 X33.371192039753566 Y24.731240023164908 F300
G1 X33.47921744791667 Y24.568712239583334 F300
G1 X33.59716113778594 Y24.413391483736536 F300
G1 X33.72456315816477 Y24.266058452058715 F300
G1 X33.86139159979097 Y24.126991408825305 F300
G1 X34.00769104642522 Y23.99653595296717 F300
G1 X34.163574641927084 Y23.875119433593753 F300
G1 X34.29853841432741 Y23.7827513740853 F300
G1 X34.43940870660564 Y23.697571308144298 F300
G1 X34.586299612744384 Y23.619818407377295 F300
G1 X34.73935789549349 Y23.549789163818183 F300
G1 X34.89875850409109 Y23.487843487965748 F300
G1 X35.064699999999995 Y23.434410416666665 F300
G0 X33.73331666666667 Y23.714339583333338
G1 X33.585842909530264 Y23.83973358888179 F300
G1 X33.42994581051994 Y23.98285755641545 F300
G1 X33.26853056640624 Y24.14626774088542 F300
G1 X33.15500074531894 Y24.273204168048622 F300
G1 X33.042598956557306 Y24.411397457329226 F300
G1 X32.932661308116366 Y24.561937274755486 F300
G1 X32.82668880208333 Y24.726007031250006 F300
G1 X32.750835079497236 Y24.858678386063467 F300
G1 X32.67907474929544 Y24.999984743237547 F300
G1 X32.61217356655512 Y25.150647082596848 F300
G1 X32.550996264086436 Y25.311441130741898 F300
G1 X32.496517740885416 Y25.483199055989587 F300
G1 X32.45320925940611 Y25.651859107363226 F300
G1 X32.41742292932979 Y25.831570356535586 F300
G1 X32.39023307259015 Y26.023346001903644 F300
G1 X32.37287236347652 Y26.228267290857655 F300
G1 X32.36674375 Y26.44748541666667 F300
G1 X32.37176293304448 Y26.67521485644522 F300
G1 X32.38695356504913 Y26.894465241628772 F300
G1 X32.4125321044279 Y27.10580586164519 F300
G1 X32.448745507637945 Y27.309781238772548 F300
G1 X32.49588108723958 Y27.50691015625 F300
G1 X32.544899746791835 Y27.669804215298875 F300
G1 X32.60249348155028 Y27.828790880120078 F300
G1 X32.66904377410785 Y27.98418517546669 F300
G1 X32.74499154783455 Y28.136277951744866 F300
G1 X32.83084120848675 Y28.28533490970718 F300
G1 X32.92716432291667 Y28.431595833333336 F300
G1 X33.02930803490222 Y28.5685936343244 F300
G1 X33.142640566831865 Y28.70394216900055 F300
G1 X33.26802328209977 Y28.83779697132224 F300
G1 X33.40640431143214 Y28.970280448657547 F300
G1 X33.558820645587375 Y29.10148296783402 F300
G1 X33.72640029296875 Y29.231464322916672 F300
G1 X33.89041923465709 Y29.346908504557675 F300
G1 X34.06934486283883 Y29.46190088651217 F300
G1 X34.264379680212116 Y29.576410682853073 F300
G1 X34.476807207856574 Y29.690386240479807 F300
G1 X34.70799464911246 Y29.803757346256024 F300
G1 X34.95939583333333 Y29.916437500000004 F300
G1 X35.65394401666667 Y30.20193985000001 F300
G1 X36.259312800000004 Y30.44385580000001 F300
G1 X36.82932478333333 Y30.665654950000004 F300
G1 X37.417802566666666 Y30.89080690000001 F300
G1 X38.078568749999995 Y31.142781250000006 F300
G1 X38.33532225917417 Y31.245069945225012 F300
G1 X38.57339627140635 Y31.351647187453036 F300
G1 X38.79412433601261 Y31.462037314250846 F300
G1 X38.998757347945165 Y31.57582651400305 F300
G1 X39.18846621277292 Y31.69266131093971 F300
G1 X39.36434426666668 Y31.812246933333345 F300
G1 X39.54198692585081 Y31.945844866544043 F300
G1 X39.70582426368073 Y32.08245559603579 F300
G1 X39.85682435023284 Y32.22184082417669 F300
G1 X39.99588271224209 Y32.36381128159563 F300
G1 X40.123824785954696 Y32.50822390193912 F300
G1 X40.24140838333333 Y32.654978716666676 F300
G1 X40.375386252955956 Y32.84239690397395 F300
G1 X40.49532426765394 Y33.03330449736729 F300
G1 X40.602219278605645 Y33.22753732375459 F300
G1 X40.696975449760224 Y33.424978025132404 F300
G1 X40.780411199999996 Y33.6255487 F300
G1 X40.85392705483303 Y33.83120398101698 F300
G1 X40.91721043822774 Y34.03950196314594 F300
G1 X40.97091310237154 Y34.25026524693925 F300
G1 X41.015649695602875 Y34.46332743710811 F300
G1 X41.052002816666665 Y34.67852898333334 F300
G1 X41.08639150618153 Y34.94927463393704 F300
G1 X41.109585044024364 Y35.22153638399526 F300
G1 X41.12270118306719 Y35.49478495417058 F300
G1 X41.12683333333333 Y35.76849166666667 F300
G1 X41.121761126550524 Y36.03649440380897 F300
G1 X41.10723894356042 Y36.28750944942501 F300
G1 X41.08423782134798 Y36.52274779702663 F300
G1 X41.05363739091222 Y36.74335334534638 F300
G1 X41.01622923177082 Y36.950406087239585 F300
G1 X40.96805746982712 Y37.16372903494962 F300
G1 X40.91318766974761 Y37.36363035850247 F300
G1 X40.85232783958535 Y37.55111343254883 F300
G1 X40.7861062613566 Y37.727120176661664 F300
G1 X40.71507552083333 Y37.89253359375 F300
G1 X40.634127351072905 Y38.059045953853705 F300
G1 X40.54862554501067 Y38.21542802114175 F300
G1 X40.459053204611884 Y38.36242575259123 F300
G1 X40.36583873043652 Y38.50073717068453 F300
G1 X40.26936009114583 Y38.63101461588543 F300
G1 X40.13893648658786 Y38.790125357561905 F300
G1 X40.004288660961514 Y38.93765483675709 F300
G1 X39.8661214103103 Y39.07462585733014 F300
G1 X39.725070833333334 Y39.201989583333344 F300
G1 X39.81129121558067 Y39.08851665170273 F300
G1 X39.89401800223478 Y38.964202815411845 F300
G1 X39.97301832660718 Y38.82902482776918 F300
G1 X40.04799511345768 Y38.68296124322691 F300
G1 X40.11858464506173 Y38.52600856481483 F300
G1 X40.194613866358935 Y38.32973735899908 F300
G1 X40.2625714764703 Y38.121402011732 F300
G1 X40.32186480526832 Y37.9015578004867 F300
G1 X40.371810493827155 Y37.670816435185195 F300
G1 X40.410190769933806 Y37.44005817909627 F300
G1 X40.43825951286158 Y37.203142929083334 F300
G1 X40.45551812055281 Y36.96094678200331 F300
G1 X40.46140624999999 Y36.71437708333334 F300
G1 X40.45637259492636 Y36.418389590065864 F300
G1 X40.44139941713457 Y36.13866391676799 F300
G1 X40.41667322306286 Y35.874105038871 F300
G1 X40.38236818073702 Y35.62367363913965 F300
G1 X40.33863927248224 Y35.38638395246146 F300
G1 X40.28561542968749 Y35.16130185546876 F300
G1 X40.228664134515945 Y34.96411005656424 F300
G1 X40.1636578649483 Y34.77504704784074 F300
G1 X40.09048467814831 Y34.59355156934352 F300
G1 X40.008989360073734 Y34.41909756367295 F300
G1 X39.91897023841025 Y34.25119374708848 F300
G1 X39.82017630844446 Y34.08938313055737 F300
G1 X39.712304687499994 Y33.933242447916676 F300
G1 X39.597209634345596 Y33.78506947025214 F300
G1 X39.47205124231247 Y33.64101819497467 F300
G1 X39.33624154451915 Y33.500828610241115 F300
G1 X39.18913112670429 Y33.36427140230225 F300
G1 X39.0300084843457 Y33.231145722092705 F300
G1 X38.85809944503269 Y33.10127664251219 F300
G1 X38.672566601562494 Y32.97451233723959 F300
G1 X38.461290019898534 Y32.844128144004415 F300
G1 X38.231533638912055 Y32.716270780279835 F300
G1 X37.98185736655577 Y32.59090055415752 F300
G1 X37.710727804430334 Y32.467987605201365 F300
G1 X37.416515820564726 Y32.34750551741102 F300
G1 X37.09749375 Y32.229425000000006 F300
G1 X35.52500885416666 Y31.743186979166676 F300
G1 X34.987559632805464 Y31.56928956224573 F300
G1 X34.43685903088614 Y31.38200322762755 F300
G1 X33.873545833333324 Y31.177970833333344 F300
G1 X33.57503932853194 Y31.059236794616456 F300
G1 X33.296493594497875 Y30.937236465529722 F300
G1 X33.03695234614572 Y30.811878799427912 F300
G1 X32.795495173087566 Y30.683072389066737 F300
G1 X32.57124024354209 Y30.55072007533391 F300
G1 X32.363347262403494 Y30.414713595225216 F300
G1 X32.171020679012344 Y30.274928317901246 F300
G1 X32.000945598161394 Y30.137561547107087 F300
G1 X31.84344514977276 Y29.99610169637138 F300
G1 X31.698003448314054 Y29.850297807475695 F300
G1 X31.56416380915418 Y29.699863881287612 F300
G1 X31.44153218108237 Y29.544476200729648 F300
G1 X31.32978037991118 Y29.383771072974103 F300
G1 X31.228649033499433 Y29.21734299270071 F300
G1 X31.137950154320983 Y29.044743209876554 F300
G1 X31.059212104857963 Y28.86946172661341 F300
G1 X30.990108439367035 Y28.686716755341322 F300
G1 X30.9307548339641 Y28.49585436311956 F300
G1 X30.881350680579544 Y28.29617406585303 F300
G1 X30.842178370474947 Y28.08692892159936 F300
G1 X30.8136020261657 Y27.867325477292198 F300
G1 X30.796065774908847 Y27.63652349674991 F300
G1 X30.79009166666666 Y27.393635416666672 F300
G1 X30.795226951447795 Y27.195750695268245 F300
G1 X30.81021913037411 Y27.00303366645199 F300
G1 X30.834497320530843 Y26.81534065625724 F300
G1 X30.867553908028775 Y26.63253155160096 F300
G1 X30.908940736646414 Y26.454473297682846 F300
G1 X30.95826506666667 Y26.28104345000001 F300
G1 X31.029403719915635 Y26.073689958930842 F300
G1 X31.11101751937735 Y25.874162995441726 F300
G1 X31.202428674670113 Y25.682338532080177 F300
G1 X31.30304307743141 Y25.498118146288633 F300
G1 X31.412340866666668 Y25.321435683333338 F300
G1 X31.531972277016227 Y25.149399790787346 F300
G1 X31.65876273531178 Y24.986294726862926 F300
G1 X31.79214011019462 Y24.832067718777928 F300
G1 X31.93159106538064 Y24.686696428085906 F300
G1 X32.076652466666665 Y24.55019431666667 F300
G1 X32.23002522083647 Y24.42010165403965 F300
G1 X32.38707997940669 Y24.300352348305605 F300
G1 X32.54731168721629 Y24.19088114333381 F300
G1 X32.71026663020618 Y24.091659585739706 F300
G1 X32.87553326666667 Y24.002701550000005 F300
G1 X33.047564763104056 Y23.921961596531077 F300
G1 X33.2197067010102 Y23.852844182166525 F300
G1 X33.391588506968745 Y23.795230149253133 F300
G1 X33.562887606032035 Y23.749059661523873 F300
G1 X33.73331666666667 Y23.714339583333338 F300
G0 X32.33155416666666 Y23.959343750000002
G1 X32.15770895029682 Y24.052534120475574 F300
G1 X31.992968690090464 Y24.15311319190318 F300
G1 X31.836914102274186 Y24.260616100031466 F300
G1 X31.689164394779525 Y24.37464156174937 F300
G1 X31.54937872053209 Y24.494845503056208 F300
G1 X31.417257519531248 Y24.620934375000004 F300
G1 X31.266025198529864 Y24.78243248404104 F300
G1 X31.12627262794174 Y24.950888696480398 F300
G1 X30.997604076547177 Y25.12574020045093 F300
G1 X30.87968947018427 Y25.306485330621566 F300
G1 X30.772265364583326 Y25.4926703125 F300
G1 X30.674463581281735 Y25.68528981642811 F300
G1 X30.587586147186013 Y25.88111761711458 F300
G1 X30.511363073060878 Y26.079611159990545 F300
G1 X30.445575138095833 Y26.28026004306423 F300
G1 X30.39005406901041 Y26.48257578125 F300
G1 X30.344140479544862 Y26.688827467604373 F300
G1 X30.308838110355154 Y26.894065995426615 F300
G1 X30.28387312879467 Y27.097776058547982 F300
G1 X30.269019672601633 Y27.299469396598564 F300
G1 X30.264099999999992 Y27.498674999999995 F300
G1 X30.269288169771567 Y27.716980030108527 F300
G1 X30.284557525527617 Y27.928205420001003 F300
G1 X30.309507210731216 Y28.132706436489602 F300
G1 X30.343791920996637 Y28.33082590783343 F300
G1 X30.38712140110538 Y28.522892502576997 F300
G1 X30.439259731450125 Y28.709218921943247 F300
G1 X30.50002437733895 Y28.89010003442291 F300
G1 X30.569284980862403 Y29.065810986125136 F300
G1 X30.646961882716045 Y29.236605324074077 F300
G1 X30.74556774626016 Y29.425294027570214 F300
G1 X30.854826525022666 Y29.607837698093327 F300
G1 X30.974741843524814 Y29.784481855808938 F300
G1 X31.105379749972478 Y29.955434430021285 F300
G1 X31.246864820729478 Y30.120863779891327 F300
G1 X31.399375956318487 Y30.280896993980758 F300
G1 X31.56314192658558 Y30.43561849722162 F300
G1 X31.738436728395058 Y30.585068981481484 F300
G1 X31.914652468960632 Y30.721219714996458 F300
G1 X32.1012304980191 Y30.852321752065418 F300
G1 X32.29840593179108 Y30.978335144113718 F300
G1 X32.50643606507862 Y31.099189471591927 F300
G1 X32.725597363449644 Y31.21478382723953 F300
G1 X32.95618248690106 Y31.324986926170787 F300
G1 X33.19849736420294 Y31.429637327389408 F300
G1 X33.45285833333333 Y31.528543749999997 F300
G1 X33.90732286941062 Y31.693438742813477 F300
G1 X34.334669108072916 Y31.84214114583333 F300
G1 X34.75709272946051 Y31.984134991748903 F300
G1 X35.17016953124999 Y32.11962291666667 F300
G1 X36.00552112630207 Y32.39055625 F300
G1 X36.4330614818992 Y32.531307676833755 F300
G1 X36.88688541666666 Y32.684508333333326 F300
G1 X37.17800855363455 Y32.7917770362398 F300
G1 X37.44631350162565 Y32.899709367599776 F300
G1 X37.69339956197792 Y33.00843468529197 F300
G1 X37.92077615419527 Y33.11806172963383 F300
G1 X38.12986616666666 Y33.22868428333334 F300
G1 X38.3429425557807 Y33.353223006296105 F300
G1 X38.53779364387268 Y33.479958857957065 F300
G1 X38.71580412822678 Y33.60909146523007 F300
G1 X38.87825536441083 Y33.74083501700154 F300
G1 X39.02632741666666 Y33.875425433333334 F300
G1 X39.146257251595465 Y33.9971355789071 F300
G1 X39.256962075098805 Y34.122091755723865 F300
G1 X39.35893466166439 Y34.25056010485021 F300
G1 X39.452618481446315 Y34.38282951065414 F300
G1 X39.53840899925078 Y34.51921325887828 F300
G1 X39.61665516666665 Y34.66005048333333 F300
G1 X39.70011027734405 Y34.83340510613835 F300
G1 X39.77412389353306 Y35.01506350821715 F300
G1 X39.83889646380278 Y35.20579941154602 F300
G1 X39.89457002171102 Y35.4064420538474 F300
G1 X39.94123541666666 Y35.617878133333335 F300
G1 X39.97664807890952 Y35.82540787589011 F300
G1 X40.00439078948237 Y36.044859981825645 F300
G1 X40.02435043957658 Y36.277155754996706 F300
G1 X40.036409916064606 Y36.52326866308469 F300
G1 X40.040454166666656 Y36.78422708333333 F300
G1 X40.03418937677009 Y37.03187728946693 F300
G1 X40.01588748099122 Y37.271488521580295 F300
G1 X39.986222375163656 Y37.50302773435232 F300
G1 X39.94578378579072 Y37.72647389449571 F300
G1 X39.89508032407407 Y37.94180856481482 F300
G1 X39.831655354032414 Y38.15794745159042 F300
G1 X39.758443318927256 Y38.363806589732974 F300
G1 X39.6759761930644 Y38.55945827805051 F300
G1 X39.58469346514853 Y38.74496262742547 F300
G1 X39.48494675925925 Y38.92035532407407 F300
G1 X39.39195612534467 Y39.06404798773366 F300
G1 X39.29356914366572 Y39.19932861159248 F300
G1 X39.18997184594852 Y39.326283063048656 F300
G1 X39.08129942484857 Y39.444970188492896 F300
G1 X38.967639449084864 Y39.555415015176266 F300
G1 X38.84903541666665 Y39.65760208333333 F300
G1 X38.92534004616457 Y39.560392813920586 F300
G1 X38.98837151789187 Y39.46027335339241 F300
G1 X39.0397412037037 Y39.35775077160494 F300
G1 X39.081613156686416 Y39.25079521065386 F300
G1 X39.11364264418513 Y39.1429205619856 F300
G1 X39.136960879629626 Y39.03467492283951 F300
G1 X39.15275136567128 Y38.9249216129931 F300
G1 X39.16146723771323 Y38.817053074607415 F300
G1 X39.16415416666666 Y38.71171666666667 F300
G1 X39.15940787150349 Y38.5890672480545 F300
G1 X39.14609188226625 Y38.47992370421047 F300
G1 X39.12540960105405 Y38.3828569613107 F300
G1 X39.098326103015474 Y38.29655376707329 F300
G1 X39.06557237654321 Y38.21982685185186 F300
G1 X39.02285820982765 Y38.144110496341135 F300
G1 X38.974311280656124 Y38.07811878283094 F300
G1 X38.92024143038845 Y38.0209201358508 F300
G1 X38.86072966553923 Y37.97179595394746 F300
G1 X38.795658179012335 Y37.93025509259259 F300
G1 X38.72638234803851 Y37.8967215535494 F300
G1 X38.651782564286265 Y37.870364472050056 F300
G1 X38.57159532739476 Y37.85120742013805 F300
G1 X38.4855022147113 Y37.83944146913379 F300
G1 X38.393158333333325 Y37.83541666666666 F300
G1 X38.299628816691 Y37.84186193899973 F300
G1 X38.208796368098255 Y37.86063443966968 F300
G1 X38.1218624228395 Y37.89122415123457 F300
G1 X38.05981565841713 Y37.92196481527047 F300
G1 X38.00275060530916 Y37.958476696394726 F300
G1 X37.95104855303379 Y38.00060038847804 F300
G1 X37.90518827160493 Y38.04833765432099 F300
G1 X37.86613001803764 Y38.1013262253631 F300
G1 X37.83473803188977 Y38.159190681226534 F300
G1 X37.81157167449352 Y38.222325173885295 F300
G1 X37.79758124999999 Y38.29129375 F300
G1 X37.86849472604899 Y38.2423214507618 F300
G1 X37.931796299422565 Y38.20676897316025 F300
G1 X37.99023098958332 Y38.181888541666666 F300
G1 X38.051192987270205 Y38.16429605435045 F300
G1 X38.114650217783776 Y38.1542648145619 F300
G1 X38.18307916666665 Y38.15106458333334 F300
G1 X38.27966706420924 Y38.157309143802536 F300
G1 X38.36525893392168 Y38.174765519491004 F300
G1 X38.441248623427725 Y38.20196296130921 F300
G1 X38.50882044753086 Y38.23799490740741 F300
G1 X38.57091339284485 Y38.28422145884708 F300
G1 X38.62489647992278 Y38.338756862969625 F300
G1 X38.67119958238343 Y38.40156857273426 F300
G1 X38.709913580246905 Y38.472915509259266 F300
G1 X38.73906537060104 Y38.54791017166856 F300
G1 X38.76057203124108 Y38.63009383414216 F300
G1 X38.77399384260151 Y38.71971080253812 F300
G1 X38.77865624999999 Y38.81702083333333 F300
G1 X38.77185368260826 Y38.92842267823116 F300
G1 X38.752647634751916 Y39.030564328342926 F300
G1 X38.72246986168675 Y39.12464452490429 F300
G1 X38.68229830729166 Y39.21170888671875 F300
G1 X38.6316335460826 Y39.29418201618151 F300
G1 X38.57211480131101 Y39.37020414084698 F300
G1 X38.50422274315945 Y39.44022955876475 F300
G1 X38.42828177083332 Y39.504573697916676 F300
G1 X38.34705446098444 Y39.56177929646124 F300
G1 X38.25981126816808 Y39.6131778214003 F300
G1 X38.16703452240155 Y39.65886427204607 F300
G1 X38.06919257812499 Y39.69886468098959 F300
G1 X37.93535442814391 Y39.74225138689307 F300
G1 X37.7976460455602 Y39.77518321036394 F300
G1 X37.657616666666655 Y39.79783125 F300
G1 X37.41239854157104 Y39.827277108297864 F300
G1 X37.15734762068953 Y39.84733726718712 F300
G1 X36.89101953124999 Y39.859644531250005 F300
G1 X36.4857258293426 Y39.86732543877238 F300
G1 X36.04603958333332 Y39.868475000000004 F300
G1 X35.74997230610626 Y39.865722713850445 F300
G1 X35.45395108024691 Y39.85809745370371 F300
G1 X34.83869683641974 Y39.8320212962963 F300
G1 X34.153474999999986 Y39.79783125 F300
G1 X34.214794447415684 Y39.72409219221538 F300
G1 X34.286267249230974 Y39.65766939387775 F300
G1 X34.36770075084404 Y39.59775668064653 F300
G1 X34.45905282600308 Y39.54371733217594 F300
G1 X34.58710106624126 Y39.4837256410894 F300
G1 X34.72828615497096 Y39.43209822542766 F300
G1 X34.88148094135802 Y39.38787407407408 F300
G1 X35.11702042514828 Y39.33578717768765 F300
G1 X35.362323177083326 Y39.29429609375 F300
G1 X35.84314336419753 Y39.22697800925926 F300
G1 X36.0705578607254 Y39.19097324153027 F300
G1 X36.265505333719126 Y39.149914438657405 F300
G1 X36.360901939774045 Y39.12309334934775 F300
G1 X36.44321919837136 Y39.093801022200935 F300
G1 X36.513021896142796 Y39.06185454600752 F300
G1 X36.57097291666666 Y39.027100000000004 F300
G1 X36.378065958519095 Y39.041337448740755 F300
G1 X36.185380205787844 Y39.047797249354396 F300
G1 X35.992726041666664 Y39.044562500000005 F300
G1 X35.848927328107905 Y39.03467460163492 F300
G1 X35.7047633701786 Y39.01744796828304 F300
G1 X35.56001810665273 Y38.9919674838526 F300
G1 X35.41447916666665 Y38.95725000000001 F300
G1 X35.41053863234782 Y38.874433122374356 F300
G1 X35.39856632288053 Y38.7918696531117 F300
G1 X35.37822145061728 Y38.71175586419754 F300
G1 X35.34846146438575 Y38.635225485608764 F300
G1 X35.31049972827005 Y38.568605454325905 F300
G1 X35.2641174382716 Y38.51306358024692 F300
G1 X35.222951205760616 Y38.47922977599406 F300
G1 X35.176700617145606 Y38.45373694067747 F300
G1 X35.124267056720726 Y38.43724927814979 F300
G1 X35.06417083333332 Y38.43125833333334 F300
G1 X34.98961483051927 Y38.43588849705446 F300
G1 X34.92040594301037 Y38.44941953311702 F300
G1 X34.855474400137076 Y38.47154362244046 F300
G1 X34.79387575921692 Y38.50225771984578 F300
G1 X34.734781835924636 Y38.541850583821464 F300
G1 X34.677467592592585 Y38.59088047839507 F300
G1 X34.617925060075294 Y38.65407153528773 F300
G1 X34.55858784659234 Y38.73051634831037 F300
G1 X34.49896060295834 Y38.82164317153825 F300
G1 X34.43848357131711 Y38.9289907282692 F300
G1 X34.37648935185183 Y39.05418549382716 F300
G1 X34.2869305260975 Y39.25933354781739 F300
G1 X34.19029633368467 Y39.50583523257276 F300
G1 X34.08309583333332 Y39.79783125000001 F300
G1 X32.29609999999998 Y39.65786666666667 F300
G1 X32.20769682325937 Y39.643267120540706 F300
G1 X32.13692596451545 Y39.624469705624676 F300
G1 X32.080812863697666 Y39.60212345759225 F300
G1 X32.036781813197415 Y39.576695910741066 F300
G1 X32.002677083333325 Y39.548395312500006 F300
G1 X31.97426552688477 Y39.51323791055883 F300
G1 X31.954337730183475 Y39.47305653912524 F300
G1 X31.942558511584565 Y39.426565728618314 F300
G1 X31.939347930854044 Y39.37207735193104 F300
G1 X31.945791666666654 Y39.30755833333333 F300
G1 X32.12094583333332 Y37.55522291666667 F300
G1 X32.126712653091445 Y37.52250258025082 F300
G1 X32.141843901345204 Y37.49683175830596 F300
G1 X32.16489973958332 Y37.47654244791667 F300
G1 X32.19338430203359 Y37.46220580435693 F300
G1 X32.22597660960898 Y37.453461842929244 F300
G1 X32.26143958333332 Y37.45044791666667 F300
G1 X32.29585209384149 Y37.45347799648021 F300
G1 X32.329375552875604 Y37.4632121032166 F300
G1 X32.36171666666666 Y37.4810734375 F300
G1 X32.3890609841941 Y37.505595724110286 F300
G1 X32.41441683182646 Y37.54084250922413 F300
G1 X32.43659374999999 Y37.59067708333334 F300
G1 X32.46741237915937 Y37.64668126806958 F300
G1 X32.518122623697906 Y37.72098437500001 F300
G1 X32.55794813048277 Y37.76894384674792 F300
G1 X32.60751375675291 Y37.819434170569274 F300
G1 X32.66873255208332 Y37.87093697916667 F300
G1 X32.73440433391697 Y37.91571530151137 F300
G1 X32.812275265163116 Y37.95761818348794 F300
G1 X32.90462099609374 Y37.994596614583344 F300
G1 X32.97487376177624 Y38.01504759038346 F300
G1 X33.05368374577226 Y38.031255050721086 F300
G1 X33.14227126638742 Y38.042057619987126 F300
G1 X33.24198541666666 Y38.04602500000001 F300
G1 X33.357848558672806 Y38.040698085575144 F300
G1 X33.46952424564564 Y38.02524708869049 F300
G1 X33.57721649146741 Y38.00033177424814 F300
G1 X33.681104877973446 Y37.966443912645204 F300
G1 X33.78132613932291 Y37.92392392578126 F300
G1 X33.878018776689665 Y37.872943355204406 F300
G1 X33.97014227843627 Y37.81429869330785 F300
G1 X34.05769559099213 Y37.74828058085434 F300
G1 X34.140621253432435 Y37.67509460304357 F300
G1 X34.21879401041666 Y37.59487734375001 F300
G1 X34.307585007612566 Y37.487398694208835 F300
G1 X34.38735514517108 Y37.37132180462871 F300
G1 X34.457761659713036 Y37.247015901712956 F300
G1 X34.518298209635404 Y37.11477021484376 F300
G1 X34.56713881992219 Y36.978489986743895 F300
G1 X34.60471743714611 Y36.83697740189307 F300
G1 X34.630496219834285 Y36.69054618306807 F300
G1 X34.643747916666655 Y36.53948750000001 F300
G1 X34.586099777556115 Y36.61228265380956 F300
G1 X34.518346637253 Y36.685312766358685 F300
G1 X34.43949509914624 Y36.75820705570368 F300
G1 X34.34841913454616 Y36.830457513432705 F300
G1 X34.243864506172834 Y36.901398302469154 F300
G1 X34.14055653834507 Y36.96156861086197 F300
G1 X34.02522312428683 Y37.01929498345544 F300
G1 X33.89670962865543 Y37.073869862167605 F300
G1 X33.75376382732797 Y37.124429507506235 F300
G1 X33.59503757716048 Y37.16994058641976 F300
G1 X33.44313434517356 Y37.204457595093615 F300
G1 X33.277082888776405 Y37.23334529096279 F300
G1 X33.0956496321873 Y37.25556321123639 F300
G1 X32.89752711950115 Y37.269913099974865 F300
G1 X32.68133333333332 Y37.27502916666668 F300
G1 X32.48116719925751 Y37.27014097640142 F300
G1 X32.2863939852839 Y37.256752601730376 F300
G1 X32.09497119140624 Y37.236705924479175 F300
G1 X31.807699022434374 Y37.19766069597996 F300
G1 X31.51190807291665 Y37.15239479166668 F300
G1 X31.21052763840529 Y37.10795932994593 F300
G1 X30.88285706380207 Y37.06808365885418 F300
G1 X30.66101482677805 Y37.04840977738617 F300
G1 X30.42060932494413 Y37.03485501276188 F300
G1 X30.158531249999985 Y37.029760416666676 F300
G1 X29.926502699994966 Y37.03604481206942 F300
G1 X29.716767998919707 Y37.05363020889458 F300
G1 X29.52777862710516 Y37.08080093936233 F300
G1 X29.358024780359447 Y37.116080389555414 F300
G1 X29.206050848765422 Y37.15822052469137 F300
G1 X29.071981159644007 Y37.20559572421065 F300
G1 X28.95348947494227 Y37.25747724492654 F300
G1 X28.849319036103214 Y37.313076683738124 F300
G1 X28.758299443883836 Y37.37178096878446 F300
G1 X28.679365991311897 Y37.43314413529383 F300
G1 X28.611581095679 Y37.49687739197532 F300
G1 X28.547484794363317 Y37.57148596601715 F300
G1 X28.49626890656225 Y37.64799182194806 F300
G1 X28.456999646465704 Y37.726404689598496 F300
G1 X28.429058288352778 Y37.80691596043706 F300
G1 X28.41217621880857 Y37.88985617437179 F300
G1 X28.406460416666654 Y37.97564583333334 F300
G1 X28.4099380930894 Y38.09371538939359 F300
G1 X28.420767515432093 Y38.19127145061729 F300
G1 X28.43355009659335 Y38.25344026135336 F300
G1 X28.451118410538925 Y38.31181522706967 F300
G1 X28.473997762345668 Y38.367856327160496 F300
G1 X28.501982964698165 Y38.42156353108082 F300
G1 X28.537386309323043 Y38.47731882969963 F300
G1 X28.58161458333332 Y38.53656250000001 F300
G1 X28.469316264324053 Y38.4800324717367 F300
G1 X28.36298416161253 Y38.41625352170229 F300
G1 X28.263064820589918 Y38.344897331151905 F300
G1 X28.17006010802469 Y38.26554097222223 F300
G1 X28.101442125400183 Y38.19640071422418 F300
G1 X28.038170279556155 Y38.12190005462104 F300
G1 X27.98048817817625 Y38.04163898927706 F300
G1 X27.928728772850352 Y37.955145272758514 F300
G1 X27.88333016975308 Y37.861875000000005 F300
G1 X27.846956769338796 Y37.76748823530307 F300
G1 X27.817253864760538 Y37.66596868414341 F300
G1 X27.794884047074678 Y37.55651507089442 F300
G1 X27.780687557550678 Y37.43824915087028 F300
G1 X27.77569374999999 Y37.31021875000001 F300
G1 X27.779938954246703 Y37.19484040901258 F300
G1 X27.792908453046113 Y37.079724856964255 F300
G1 X27.81503525588789 Y36.96513243108194 F300
G1 X27.84687108503664 Y36.85134160396537 F300
G1 X27.88909664713541 Y36.7386732747396 F300
G1 X27.940133156346906 Y36.63198852271444 F300
G1 X28.001912122183473 Y36.52775639804948 F300
G1 X28.07536288538749 Y36.42620583113108 F300
G1 X28.16162040498585 Y36.327693625773364 F300
G1 X28.26203098958332 Y36.23273619791668 F300
G1 X28.347964743052405 Y36.163964672994574 F300
G1 X28.4435570724023 Y36.09799155296533 F300
G1 X28.54977984758114 Y36.035188919926696 F300
G1 X28.667713782864865 Y35.9760444579456 F300
G1 X28.798548821227726 Y35.92117032901339 F300
G1 X28.943585253906235 Y35.87131123046876 F300
G1 X29.08017144502613 Y35.833258569418035 F300
G1 X29.22966073989828 Y35.800076986618194 F300
G1 X29.393296202584757 Y35.77253626594605 F300
G1 X29.572408822110496 Y35.75152723352849 F300
G1 X29.768420527693912 Y35.738066592276326 F300
G1 X29.982847916666653 Y35.73330208333335 F300
G1 X30.172211993827514 Y35.7383624763589 F300
G1 X30.349999144251342 Y35.75258535996517 F300
G1 X30.517531186174015 Y35.774651189247656 F300
G1 X30.676032976466043 Y35.80338726851854 F300
G1 X30.886954912351502 Y35.85341570985602 F300
G1 X31.086167881853036 Y35.912553773949014 F300
G1 X31.275768672839494 Y35.97860023148151 F300
G1 X31.554496174858375 Y36.089680356983656 F300
G1 X31.822925781249985 Y36.206377083333344 F300
G1 X32.089684033242015 Y36.32360441482966 F300
G1 X32.35837507716048 Y36.43415393518521 F300
G1 X32.54014249172536 Y36.50059150232678 F300
G1 X32.727726243763996 Y36.55967737389847 F300
G1 X32.922987336033934 Y36.60936689814815 F300
G1 X33.07022325259053 Y36.63824314534091 F300
G1 X33.22432946354314 Y36.66029832515943 F300
G1 X33.38640623255145 Y36.67444208726089 F300
G1 X33.557633333333314 Y36.679452083333345 F300
G1 X33.6876810494247 Y36.67474490978528 F300
G1 X33.803997195964016 Y36.661666752241985 F300
G1 X33.90787316628341 Y36.64159263491515 F300
G1 X34.00051567855943 Y36.6156555518074 F300
G1 X34.08303703703702 Y36.58476064814816 F300
G1 X34.16684580171457 Y36.54392371506681 F300
G1 X34.239250290623566 Y36.498611713698054 F300
G1 X34.301388294957235 Y36.44956531711736 F300
G1 X34.35422613872183 Y36.39728821924597 F300
G1 X34.39853796296295 Y36.3420789351852 F300
G1 X34.43688023189573 Y36.280390960711934 F300
G1 X34.46622076642973 Y36.216613721560066 F300
G1 X34.487036746869435 Y36.15087027645073 F300
G1 X34.4995627351203 Y36.08317714750747 F300
G1 X34.503783333333324 Y36.013495833333344 F300
G1 X34.49794313465741 Y35.93530584009789 F300
G1 X34.48079535638092 Y35.86011773753675 F300
G1 X34.4525251161552 Y35.78793667823713 F300
G1 X34.41284506172839 Y35.71891658950619 F300
G1 X34.364167390493755 Y35.6569121152925 F300
G1 X34.3048280735483 Y35.59969147764455 F300
G1 X34.23400450417163 Y35.547816324276866 F300
G1 X34.15057438271604 Y35.50224243827162 F300
G1 X34.06446246539085 Y35.46807185507578 F300
G1 X33.96698558804937 Y35.44157783787432 F300
G1 X33.856885602948644 Y35.42421764461429 F300
G1 X33.732787499999986 Y35.41791875000001 F300
G1 X33.58304139862138 Y35.42471579256076 F300
G1 X33.44441328624525 Y35.443712640972876 F300
G1 X33.31599252965338 Y35.47308937708218 F300
G1 X33.19693765432098 Y35.511355864197554 F300
G1 X33.0793934172049 Y35.560634528721664 F300
G1 X32.97206019096301 Y35.61682007116744 F300
G1 X32.87430131913582 Y35.678608956036285 F300
G1 X32.785559567901224 Y35.74490455246915 F300
G1 X32.70059124421998 Y35.81928411252455 F300
G1 X32.626114106569915 Y35.895361386360555 F300
G1 X32.561495258292126 Y35.97204458962324 F300
G1 X32.506179166666655 Y36.04842083333334 F300
G1 X32.47802585063866 Y36.09638636571744 F300
G1 X32.449293749999995 Y36.12746510416667 F300
G1 X32.42670711956325 Y36.14166001735525 F300
G1 X32.399768901304014 Y36.15055310838834 F300
G1 X32.366214583333324 Y36.153725 F300
G1 X32.316220793338886 Y36.14733771655209 F300
G1 X32.281280110922715 Y36.13171071905517 F300
G1 X32.256677083333315 Y36.10990338541667 F300
G1 X32.238903140503695 Y36.08110710492146 F300
G1 X32.22892570083096 Y36.04861890340368 F300
G1 X32.22572083333332 Y36.01349583333334 F300
G1 X32.26143958333332 Y34.33153958333334 F300
G1 X32.26522318973741 Y34.26668139746986 F300
G1 X32.275926507685575 Y34.212468527555544 F300
G1 X32.292831993546876 Y34.1673713038811 F300
G1 X32.31563503848018 Y34.13008946289328 F300
G1 X32.34451874999999 Y34.09966536458334 F300
G1 X32.378532417681036 Y34.07648856392462 F300
G1 X32.42016041869497 Y34.059072101268626 F300
G1 X32.47128421840442 Y34.048072475895125 F300
G1 X32.53423430145371 Y34.04483320171059 F300
G1 X32.61174791666666 Y34.05134583333334 F300
G1 X33.67058101851852 Y34.16421512345681 F300
G1 X34.72959050925925 Y34.277143209876556 F300
G1 X35.25432562055144 Y34.32653440323467 F300
G1 X35.765316666666656 Y34.36672916666668 F300
G1 X35.99397852371702 Y34.39351472673045 F300
G1 X36.21394301579911 Y34.430307647785575 F300
G1 X36.42539085815187 Y34.476451885974996 F300
G1 X36.62849878983063 Y34.531366066151556 F300
G1 X36.82343410000001 Y34.59453965000002 F300
G1 X37.018390538793284 Y34.66882540183414 F300
G1 X37.20383758472228 Y34.75076337220508 F300
G1 X37.379966109177765 Y34.83984697376715 F300
G1 X37.54694852283965 Y34.93563916006017 F300
G1 X37.70493263333332 Y35.03776753333334 F300
G1 X37.85946281838021 Y35.150094213440234 F300
G1 X38.00368668863231 Y35.26789496957819 F300
G1 X38.13779166627627 Y35.39081485913457 F300
G1 X38.26192674772742 Y35.51856354956829 F300
G1 X38.37619536666665 Y35.65090871666667 F300
G1 X38.48343166740999 Y35.791560073703096 F300
G1 X38.57970073880538 Y35.93578949326911 F300
G1 X38.665128405285884 Y36.08342195523696 F300
G1 X38.73977063166717 Y36.23433697809181 F300
G1 X38.803605399999995 Y36.38845910000001 F300
G1 X38.856962303797715 Y36.54721467051666 F300
G1 X38.89877962932886 Y36.70820710711359 F300
G1 X38.92896996944128 Y36.871454644892374 F300
G1 X38.947332545377165 Y37.037003508725874 F300
G1 X38.95354583333332 Y37.20491458333335 F300
G1 X38.95298574058461 Y37.35876641911426 F300
G1 X38.94921328124999 Y37.50283541666668 F300
G1 X38.939109548241 Y37.64668177784333 F300
G1 X38.91888541666666 Y37.800756250000006 F300
G1 X38.980502833140534 Y37.693913335630526 F300
G1 X39.031835464446324 Y37.58745191623182 F300
G1 X39.07373677123008 Y37.48028490179805 F300
G1 X39.106938020833326 Y37.3713375 F300
G1 X39.13186309084336 Y37.26056166360429 F300
G1 X39.149554360243556 Y37.144200496061934 F300
G1 X39.160117097373956 Y37.02098339109145 F300
G1 X39.163624999999996 Y36.889531250000005 F300
G1 X39.15807526528836 Y36.6941406505814 F300
G1 X39.141230804444156 Y36.50572981763215 F300
G1 X39.11275049066852 Y36.32379272903725 F300
G1 X39.07221476617091 Y36.14784996665257 F300
G1 X39.01910875651041 Y35.97745462239584 F300
G1 X38.96486653863772 Y35.83954583559447 F300
G1 X38.90087512135774 Y35.704637208675514 F300
G1 X38.826495005315245 Y35.57245686949626 F300
G1 X38.740977470994494 Y35.44277688199555 F300
G1 X38.64345920265655 Y35.315416521171976 F300
G1 X38.53295755208333 Y35.19024479166667 F300
G1 X38.41976978046922 Y35.07778172080527 F300
G1 X38.29325497476704 Y34.96652136702292 F300
G1 X38.152126385883804 Y34.8564659781076 F300
G1 X37.99497040971035 Y34.74767502692348 F300
G1 X37.82024336251671 Y34.64026363493016 F300
G1 X37.62626767578125 Y34.534400585937505 F300
G1 X37.442159149283015 Y34.44452521386441 F300
G1 X37.24015488572218 Y34.355723695257026 F300
G1 X37.018683904198504 Y34.26822884548177 F300
G1 X36.77606880351942 Y34.18230805407621 F300
G1 X36.51052096949905 Y34.09826154116011 F300
G1 X36.22013541666666 Y34.01642083333334 F300
G1 X35.780801257635545 Y33.904212715463466 F300
G1 X35.37862812499999 Y33.80830537109376 F300
G1 X34.98535169545322 Y33.71987003200854 F300
G1 X34.61272552083333 Y33.63955494791668 F300
G1 X33.87966432291666 Y33.48395100911459 F300
G1 X33.51440069649068 Y33.40340898839329 F300
G1 X33.136681249999995 Y33.31527500000001 F300
G1 X32.86550018526023 Y33.24623305856364 F300
G1 X32.60306537104653 Y33.16820417460103 F300
G1 X32.34921377249475 Y33.081611425940615 F300
G1 X32.10379018631988 Y32.986835059932446 F300
G1 X31.866649676837568 Y32.88421437091488 F300
G1 X31.637660033333336 Y32.774049683333345 F300
G1 X31.409554252155655 Y32.65261065524269 F300
G1 X31.190655963558775 Y32.52411249864807 F300
G1 X30.980821673070494 Y32.38886395519214 F300
G1 X30.779924064088817 Y32.24713552047829 F300
G1 X30.587854585613375 Y32.099161796851 F300
G1 X30.40452601666666 Y31.945143966666677 F300
G1 X30.2257812431896 Y31.78133600991998 F300
G1 X30.05673936301725 Y31.612192445218803 F300
G1 X29.89729490219858 Y31.437914346988123 F300
G1 X29.747368548592135 Y31.258669983596796 F300
G1 X29.606909861971648 Y31.074597787465137 F300
G1 X29.47589989999999 Y30.885809450000004 F300
G1 X29.352807000978526 Y30.689799672515093 F300
G1 X29.239919630049346 Y30.489924052725605 F300
G1 X29.137206758112896 Y30.28627684796615 F300
G1 X29.044676127563122 Y30.078927427996362 F300
G1 X28.962376941474297 Y29.867924049681253 F300
G1 X28.89040238333333 Y29.65329773333334 F300
G1 X28.828994223094817 Y29.43546640879965 F300
G1 X28.77836843690291 Y29.214883660209516 F300
G1 X28.738632745922594 Y28.99154822609478 F300
G1 X28.709948035734588 Y28.765446820496273 F300
G1 X28.692530606363675 Y28.5365587286394 F300
G1 X28.686654166666663 Y28.30486041666667 F300
G1 X28.691821992252823 Y28.09025578016342 F300
G1 X28.706892514724323 Y27.87832132089868 F300
G1 X28.731570825282766 Y27.669144852575908 F300
G1 X28.76560578302648 Y27.4628130233451 F300
G1 X28.808788216803524 Y27.25941558784464 F300
G1 X28.860948966666673 Y27.059049683333342 F300
G1 X28.922510298129108 Y26.86016940425119 F300
G1 X28.992586973193216 Y26.665605397086726 F300
G1 X29.070978205615177 Y26.475456825329438 F300
G1 X29.157520124276743 Y26.2898320268481 F300
G1 X29.252083704877666 Y26.108852533997933 F300
G1 X29.35457256666667 Y25.932657050000007 F300
G1 X29.465313099398724 Y25.76082595634983 F300
G1 X29.583285214111687 Y25.595020376059058 F300
G1 X29.708367269165297 Y25.435352327038377 F300
G1 X29.840470769591896 Y25.281953821676094 F300
G1 X29.979537872665908 Y25.134980991532146 F300
G1 X30.125538766666665 Y24.994618116666665 F300
G1 X30.277996808298802 Y24.861474164034533 F300
G1 X30.436561100809374 Y24.73596645020861 F300
G1 X30.601209545730953 Y24.618245152775124 F300
G1 X30.771949540491438 Y24.508496490041836 F300
G1 X30.948814683284795 Y24.406947141909555 F300
G1 X31.13186136666667 Y24.313868483333337 F300
G1 X31.318031919934725 Y24.230880915372033 F300
G1 X31.509558357978555 Y24.15703426141021 F300
G1 X31.706542907097266 Y24.092597573311718 F300
G1 X31.909108652754984 Y24.0378985986206 F300
G1 X32.11739517463985 Y23.993328080584234 F300
G1 X32.33155416666666 Y23.959343750000002 F300
G0 X20.59278541666667 Y36.60907291666667
G1 X20.65661682711061 Y36.769556436153756 F300
G1 X20.70210033041302 Y36.91687643157319 F300
G1 X20.733047656250005 Y37.05139010416667 F300
G1 X20.754486463662918 Y37.18865814182647 F300
G1 X20.765034046404754 Y37.30951223601146 F300
G1 X20.767939583333337 Y37.414729166666675 F300
G1 X20.763575772123914 Y37.52935099441453 F300
G1 X20.751159427413025 Y37.640541200189986 F300
G1 X20.731613185779477 Y37.74789076297313 F300
G1 X20.705752700617293 Y37.851007484567916 F300
G1 X20.66075054958414 Y37.98634059100658 F300
G1 X20.608199339701255 Y38.10849054933251 F300
G1 X20.550197299382717 Y38.21696543209877 F300
G1 X20.48221760697275 Y38.31991163871457 F300
G1 X20.41419935548818 Y38.402498059572885 F300
G1 X20.34778125 Y38.46591875000001 F300
G1 X20.44647329780729 Y38.46136457223528 F300
G1 X20.541957861299345 Y38.44812585244454 F300
G1 X20.6341006622749 Y38.42671980725175 F300
G1 X20.722753710937507 Y38.39751569010417 F300
G1 X20.808807204499683 Y38.36022098429953 F300
G1 X20.88970766881067 Y38.31595859722959 F300
G1 X20.965300739121094 Y38.26503176511342 F300
G1 X21.035367187500007 Y38.207619270833334 F300
G1 X21.099675446092586 Y38.14370384333163 F300
G1 X21.156973895040956 Y38.07430739762664 F300
G1 X21.207026888409516 Y37.99948806647958 F300
G1 X21.249456445312504 Y37.91919863281251 F300
G1 X21.283008985071326 Y37.83538417764376 F300
G1 X21.307864988503056 Y37.74696050688382 F300
G1 X21.323431331465056 Y37.65367474266546 F300
G1 X21.328856250000005 Y37.55522291666667 F300
G1 X21.324464956636273 Y37.45610979855606 F300
G1 X21.31182309820141 Y37.36396511937791 F300
G1 X21.29175049767699 Y37.2781334517974 F300
G1 X21.264883037751574 Y37.198014090164946 F300
G1 X21.231685570987658 Y37.1230701388889 F300
G1 X21.17980562265913 Y37.0330060995918 F300
G1 X21.11875931525278 Y36.950760974198445 F300
G1 X21.048998354367168 Y36.875781745553496 F300
G1 X20.97076720679013 Y36.80768680555556 F300
G1 X20.886329270110345 Y36.747668393326734 F300
G1 X20.79501335348911 Y36.694580602971314 F300
G1 X20.69708850977801 Y36.648364424733316 F300
G1 X20.59278541666667 Y36.60907291666667 F300
G0 X27.04068125 Y28.26967083333333
G1 X28.16172083333333 Y28.865247916666668 F300
G1 X28.21019143607576 Y29.13039514689778 F300
G1 X28.26698284551087 Y29.387120039232713 F300
G1 X28.33192902566577 Y29.635649230616856 F300
G1 X28.40489222902135 Y29.87620192010878 F300
G1 X28.485763579832906 Y30.108988113501223 F300
G1 X28.574463573799243 Y30.33420683194123 F300
G1 X28.670942483743865 Y30.552044295745127 F300
G1 X28.775180662328236 Y30.762672096303017 F300
G1 X28.887188734567903 Y30.966245370370377 F300
G1 X29.01020674100458 Y31.16789018569836 F300
G1 X29.14131778356544 Y31.362093474752804 F300
G1 X29.28061020627817 Y31.549008768089724 F300
G1 X29.428210106309184 Y31.728762579613935 F300
G1 X29.584280901465984 Y31.90145219222645 F300
G1 X29.74902273066451 Y32.067143557743236 F300
G1 X29.92267170071632 Y32.22586933212963 F300
G1 X30.10549899672123 Y32.37762706353013 F300
G1 X30.297809876543212 Y32.5223775462963 F300
G1 X30.491042255884416 Y32.65426983809179 F300
G1 X30.693443265162834 Y32.77948398389031 F300
G1 X30.90538059593557 Y32.89791997967561 F300
G1 X31.127251382410464 Y33.009438206510666 F300
G1 X31.35948088987194 Y33.11385853857304 F300
G1 X31.60252121289727 Y33.210959617743846 F300
G1 X31.856850005515565 Y33.300478280592806 F300
G1 X32.122969262387166 Y33.38210912063501 F300
G1 X32.40140416666666 Y33.45550416666667 F300
G1 X31.452128776041665 Y33.40845380859375 F300
G1 X30.509302604166663 Y33.36802630208334 F300
G1 X29.513989713541665 Y33.32754918619791 F300
G1 X28.407254166666664 Y33.28035 F300
G1 X27.885296305519052 Y33.256056854340585 F300
G1 X27.283263950000006 Y33.223240216666674 F300
G1 X25.99101143333333 Y33.142495733333334 F300
G1 X24.62302881666666 Y33.048263850000005 F300
G1 X23.271848299999995 Y32.950691866666666 F300
G1 X22.030002083333326 Y32.85992708333333 F300
G1 X21.90790716984812 Y32.85475004563316 F300
G1 X21.800451403404175 Y32.86168867459827 F300
G1 X21.705778026357315 Y32.879393325532995 F300
G1 X21.622213689863887 Y32.906911923936 F300
G1 X21.548306790401373 Y32.94372450788912 F300
G1 X21.482873422309773 Y32.98976501730312 F300
G1 X21.42504446598977 Y33.04542399232776 F300
G1 X21.374305079520262 Y33.11152976832017 F300
G1 X21.330518656439622 Y33.189311265877976 F300
G1 X21.293931249999996 Y33.28035 F300
G1 X21.199942154947912 Y33.59294694010417 F300
G1 X21.09268255208333 Y33.96800208333333 F300
G1 X21.04186674345085 Y34.16322831691717 F300
G1 X20.998470214843742 Y34.3496056640625 F300
G1 X20.96356881353448 Y34.5308791403665 F300
G1 X20.943622916666662 Y34.68184791666667 F300
G1 X20.935830656502006 Y34.78663306256307 F300
G1 X20.937141252132125 Y34.880737917994935 F300
G1 X20.947493672839503 Y34.96615740740742 F300
G1 X20.968361871837956 Y35.0491659868672 F300
G1 X21.000408513095156 Y35.12782883706035 F300
G1 X21.044968132716043 Y35.203723842592595 F300
G1 X21.099389952076525 Y35.27327095347209 F300
G1 X21.16972033788809 Y35.3442009298343 F300
G1 X21.25927083333333 Y35.417654166666665 F300
G1 X21.398715102164655 Y35.51558813994601 F300
G1 X21.536500583031437 Y35.61805348348188 F300
G1 X21.670735123697913 Y35.72660068359375 F300
G1 X21.76731477135227 Y35.81238884025892 F300
G1 X21.859826905856032 Y35.90288694028606 F300
G1 X21.947578155319544 Y35.99885899934411 F300
G1 X22.02983671874999 Y36.10110598958334 F300
G1 X22.104207154008808 Y36.20796312242129 F300
G1 X22.171906175821626 Y36.32269110185681 F300
G1 X22.232132590377837 Y36.446477643314 F300
G1 X22.283915266927075 Y36.58063434244792 F300
G1 X22.316267445879824 Y36.68798433267155 F300
G1 X22.342861643464236 Y36.80307889605736 F300
G1 X22.362986123828687 Y36.926859752946676 F300
G1 X22.375797046807147 Y37.06034812449464 F300
G1 X22.380310416666656 Y37.204650000000015 F300
G1 X22.37351998365927 Y37.35824042863048 F300
G1 X22.354081570946626 Y37.50369421791924 F300
G1 X22.323203348545736 Y37.64152840656896 F300
G1 X22.28185590857338 Y37.77222106288922 F300
G1 X22.230796028645823 Y37.89619228515627 F300
G1 X22.168576331503623 Y38.017347796614274 F300
G1 X22.097907735125247 Y38.13078037859782 F300
G1 X22.019472006370794 Y38.23672416746458 F300
G1 X21.933825030092525 Y38.335344808652486 F300
G1 X21.841420312499988 Y38.42672734375001 F300
G1 X21.741746720720098 Y38.51156531016014 F300
G1 X21.637354461106185 Y38.587943170257205 F300
G1 X21.52878234697362 Y38.65593728755799 F300
G1 X21.41650126882472 Y38.715552303284504 F300
G1 X21.300934440104157 Y38.76671279296876 F300
G1 X21.18114707252424 Y38.8096791230527 F300
G1 X21.06056577365078 Y38.84315145047488 F300
G1 X20.939613545958277 Y38.8671772146124 F300
G1 X20.818668926341516 Y38.88171107362741 F300
G1 X20.698089583333324 Y38.886606250000014 F300
G1 X20.55827644922256 Y38.88342776737482 F300
G1 X20.435014001490735 Y38.87441858253064 F300
G1 X20.325886979166658 Y38.860313281250015 F300
G1 X20.21773263413474 Y38.83924883522587 F300
G1 X20.120613897965598 Y38.812943777780696 F300
G1 X20.03266249999999 Y38.78183125000001 F300
G1 X19.926768668743932 Y38.848340233055346 F300
G1 X19.814538040123452 Y38.90743973765434 F300
G1 X19.736386502473938 Y38.940494742070904 F300
G1 X19.64904112274754 Y38.96979385960085 F300
G1 X19.549729320987648 Y38.994360262345694 F300
G1 X19.449039631389077 Y39.01122825686744 F300
G1 X19.331023732171168 Y39.02261217088267 F300
G1 X19.191552083333324 Y39.02683541666668 F300
G1 X19.079631353398828 Y39.02234070060922 F300
G1 X18.970801060211354 Y39.009462216324344 F300
G1 X18.865192376363577 Y38.98901803484435 F300
G1 X18.762939485677077 Y38.96171897786459 F300
G1 X18.62933625964807 Y38.91461313603347 F300
G1 X18.50495414212795 Y38.85840904110152 F300
G1 X18.390162239583326 Y38.79482890625001 F300
G1 X18.28077755211073 Y38.722044540036464 F300
G1 X18.185014254032687 Y38.64618034779581 F300
G1 X18.102762727864576 Y38.56885406901043 F300
G1 X18.028049255184552 Y38.484006608845775 F300
G1 X17.97098133840615 Y38.40291378942733 F300
G1 X17.93028333333333 Y38.32648333333334 F300
G1 X17.776084675029633 Y38.330951314081744 F300
G1 X17.627829123886656 Y38.32341275262519 F300
G1 X17.48543596786917 Y38.30473029310151 F300
G1 X17.348820582348335 Y38.27559263206625 F300
G1 X17.217917513020826 Y38.236525000000015 F300
G1 X17.088772699027484 Y38.186182584355294 F300
G1 X16.967110050577382 Y38.12666235355811 F300
G1 X16.852874866282445 Y38.05842575073403 F300
G1 X16.74607197994623 Y37.981787639357314 F300
G1 X16.646789583333327 Y37.89693229166669 F300
G1 X16.554877634568623 Y37.80354938295911 F300
G1 X16.471985300223558 Y37.70315165665494 F300
G1 X16.398226075325184 Y37.59583358522741 F300
G1 X16.333848415482784 Y37.48158046675243 F300
G1 X16.279258528645826 Y37.360291145833344 F300
G1 X16.236287041642115 Y37.23602453156072 F300
G1 X16.203980032768335 Y37.106026042560465 F300
G1 X16.18289120064753 Y36.97006838507265 F300
G1 X16.17379108309052 Y36.82788297392592 F300
G1 X16.177683333333324 Y36.67918750000001 F300
G1 X16.227168441089663 Y36.72379474974758 F300
G1 X16.288021167986653 Y36.769172357378295 F300
G1 X16.360823996913574 Y36.81415439814817 F300
G1 X16.436798420770646 Y36.852927695502075 F300
G1 X16.521213302531898 Y36.887968839469735 F300
G1 X16.613932253086414 Y36.917900462962976 F300
G1 X16.708659084813664 Y36.93994973043013 F300
G1 X16.8087858584296 Y36.95425365581745 F300
G1 X16.914018749999993 Y36.959381250000014 F300
G1 X17.010391440827732 Y36.953499919664175 F300
G1 X17.103095883798005 Y36.93645755173638 F300
G1 X17.191740865090242 Y36.90890209050573 F300
G1 X17.27588055555555 Y36.87116720679015 F300
G1 X17.354877247610617 Y36.82333981147506 F300
G1 X17.426321534179593 Y36.76669867320922 F300
G1 X17.48979141157436 Y36.70138597892178 F300
G1 X17.544609027777767 Y36.62726057098767 F300
G1 X17.580390327032113 Y36.56374363545354 F300
G1 X17.609396066260864 Y36.495478819777915 F300
G1 X17.631154717961046 Y36.42216262994479 F300
G1 X17.64495749225612 Y36.34340569343908 F300
G1 X17.64982499999999 Y36.258764583333345 F300
G1 X17.64480248882289 Y36.06160985316133 F300
G1 X17.631578549382706 Y35.840732716049395 F300
G1 X17.597692283950604 Y35.36843186728397 F300
G1 X17.584734206395485 Y35.11870442856039 F300
G1 X17.57944583333332 Y34.857266666666675 F300
G1 X17.58632938297745 Y34.65505426364026 F300
G1 X17.605730906333132 Y34.464168478979936 F300
G1 X17.635950184894806 Y34.28349873024849 F300
G1 X17.67549938271604 Y34.11200646219138 F300
G1 X17.725626117932215 Y33.940822363056604 F300
G1 X17.783201481229646 Y33.777867901127905 F300
G1 X17.84693384456632 Y33.62242047208382 F300
G1 X17.91563325617283 Y33.473799614197546 F300
G1 X18.016567699133283 Y33.278732200890744 F300
G1 X18.121541648737146 Y33.09496018435262 F300
G1 X18.227807291666657 Y32.92124427083335 F300
G1 X18.539981327160483 Y32.43293858024693 F300
G1 X18.633982286459897 Y32.27659930113454 F300
G1 X18.714544556435534 Y32.12855212787085 F300
G1 X18.780115200617274 Y31.987480690586434 F300
G1 X18.821269825561085 Y31.877830601979543 F300
G1 X18.851336690642356 Y31.77119945043159 F300
G1 X18.869837608016187 Y31.666703407518874 F300
G1 X18.87616874999999 Y31.563468750000016 F300
G1 X18.869496137472492 Y31.458201088223674 F300
G1 X18.85039983165284 Y31.35856939698934 F300
G1 X18.81993374627674 Y31.264655174687874 F300
G1 X18.778753086419748 Y31.176608719135825 F300
G1 X18.726619084223998 Y31.093982778239422 F300
G1 X18.665511817303216 Y31.019949833124997 F300
G1 X18.595836505571977 Y30.954746965371516 F300
G1 X18.517707330246907 Y30.898874614197553 F300
G1 X18.450722875090214 Y30.862251676709533 F300
G1 X18.3795829160453 Y30.832839152081 F300
G1 X18.304180726869504 Y30.810990350048534 F300
G1 X18.224336539344034 Y30.797267987170365 F300
G1 X18.139833333333325 Y30.792472916666682 F300
G1 X18.187051635615905 Y30.647145512712306 F300
G1 X18.243980198102992 Y30.511823306309754 F300
G1 X18.3101401265958 Y30.385801575288536 F300
G1 X18.385219333593394 Y30.268464257689814 F300
G1 X18.469062305343414 Y30.15929404115081 F300
G1 X18.56165756172839 Y30.057881790123478 F300
G1 X18.66230116811404 Y29.964635330946457 F300
G1 X18.771313559899045 Y29.87899793047094 F300
G1 X18.88883411694026 Y29.80083596310978 F300
G1 X19.015080390032253 Y29.73011685853845 F300
G1 X19.150333919995465 Y29.666911036587965 F300
G1 X19.29492577160493 Y29.611392515432115 F300
G1 X19.43811192449958 Y29.566896470071622 F300
G1 X19.589207439557065 Y29.52976202173486 F300
G1 X19.74843046286057 Y29.50024025800775 F300
G1 X19.916008409899142 Y29.478647021416997 F300
G1 X20.092169984894372 Y29.465361573362916 F300
G1 X20.27713749999999 Y29.460825000000018 F300
G1 X20.537937261635616 Y29.463843928149643 F300
G1 X20.796923860677076 Y29.47178040364585 F300
G1 X21.333056510416657 Y29.495882291666682 F300
G1 X21.92827392578124 Y29.519984179687512 F300
G1 X22.25386956914669 Y29.527801060661844 F300
G1 X22.625314583333324 Y29.530939583333346 F300
G1 X23.18116083605847 Y29.5267533714483 F300
G1 X23.676602047457383 Y29.51437042798449 F300
G1 X24.117131064319047 Y29.49426963089834 F300
G1 X24.5078498046875 Y29.466993098958334 F300
G1 X24.83860219069816 Y29.434817242826583 F300
G1 X25.133126402660228 Y29.397049140738755 F300
G1 X25.394778745334623 Y29.354178873768415 F300
G1 X25.62668114359248 Y29.306702652880052 F300
G1 X25.831733854166668 Y29.255111458333335 F300
G1 X26.015957021216416 Y29.19875988343694 F300
G1 X26.17876631482018 Y29.138659173997457 F300
G1 X26.322314452563088 Y29.075111243194495 F300
G1 X26.448575512903815 Y29.008358508536563 F300
G1 X26.559347035947013 Y28.938569832660285 F300
G1 X26.656249934895833 Y28.865826692708332 F300
G1 X26.75092809824921 Y28.77997822038337 F300
G1 X26.83209174306681 Y28.689405808072095 F300
G1 X26.900886770577785 Y28.593707813259766 F300
G1 X26.958202215884963 Y28.492336653236826 F300
G1 X27.004671948016245 Y28.38460083248041 F300
G1 X27.04068125 Y28.26967083333333 F300
G0 X37.83303541666667 Y18.35335208333334
G1 X38.183343750000006 Y18.35335208333334 F300
G1 X38.16885140120586 Y18.635492823435932 F300
G1 X38.144405531537366 Y18.897702327673343 F300
G1 X38.110900522268004 Y19.142474029048774 F300
G1 X38.06914174382717 Y19.37208611111112 F300
G1 X38.01618004945549 Y19.603145767308607 F300
G1 X37.95460015262006 Y19.824126494935644 F300
G1 X37.884814749414204 Y20.03679439839914 F300
G1 X37.80718464506174 Y20.24282986111112 F300
G1 X37.72107615826461 Y20.445956634373488 F300
G1 X37.626608730864504 Y20.6474619967615 F300
G1 X37.52385474603794 Y20.84876208732321 F300
G1 X37.412877083333335 Y21.05130833333334 F300
G1 X37.28530789302239 Y21.280196736286985 F300
G1 X37.149058101851864 Y21.510732793209883 F300
G1 X37.008046417215105 Y21.736792008021187 F300
G1 X36.869893287037044 Y21.946815123456794 F300
G1 X36.73077729473805 Y22.146423726497588 F300
G1 X36.60642708333334 Y22.313106250000008 F300
G1 X36.54933305934488 Y22.388929213352814 F300
G1 X36.49102269874085 Y22.448953809549277 F300
G1 X36.43138150452014 Y22.495875859801398 F300
G1 X36.370088020833336 Y22.531850520833338 F300
G1 X36.30353454629913 Y22.559591687248407 F300
G1 X36.23353579862375 Y22.5785492162858 F300
G1 X36.15954938926917 Y22.589497670595694 F300
G1 X36.08096458333334 Y22.59303541666667 F300
G1 X36.03443612891199 Y22.588952007745036 F300
G1 X35.99372048571031 Y22.577500258431932 F300
G1 X35.959070061728404 Y22.55938433641976 F300
G1 X35.930370839739666 Y22.53401196549165 F300
G1 X35.9101876711187 Y22.502443549334743 F300
G1 X35.89938202160495 Y22.463526774691363 F300
G1 X35.89956461963129 Y22.422843016538287 F300
G1 X35.91171297167812 Y22.373536296817495 F300
G1 X35.94100000000001 Y22.313106250000008 F300
G1 X36.08388802506444 Y22.07437890088133 F300
G1 X36.256108950617296 Y21.770661419753097 F300
G1 X36.433808960956696 Y21.440189830063943 F300
G1 X36.641538271604944 Y21.033365663580252 F300
G1 X36.85409241763364 Y20.595701763149023 F300
G1 X37.09722916666668 Y20.07023333333334 F300
G1 X36.990826455149474 Y20.04775625117794 F300
G1 X36.90365566579934 Y20.020255992690526 F300
G1 X36.832307254337834 Y19.98858580994115 F300
G1 X36.77388873456791 Y19.953336496913593 F300
G1 X36.71981307717693 Y19.9089610776852 F300
G1 X36.676111223776005 Y19.85947006681187 F300
G1 X36.64124958510019 Y19.80446201412355 F300
G1 X36.61411959876544 Y19.743247530864206 F300
G1 X36.589966114932636 Y19.65654914999032 F300
G1 X36.575825831767936 Y19.556079437689853 F300
G1 X36.57123750000001 Y19.43973125 F300
G1 X36.57737455989894 Y19.33503721608435 F300
G1 X36.59527613475915 Y19.23233178800716 F300
G1 X36.624541607803344 Y19.13171420734663 F300
G1 X36.66503229166667 Y19.033347786458336 F300
G1 X36.71533860926745 Y18.93998188765098 F300
G1 X36.77564718781433 Y18.85074384132954 F300
G1 X36.845929721690545 Y18.765985387799834 F300
G1 X36.92630833333334 Y18.68619791666667 F300
G1 X37.01315175626372 Y18.61492836496584 F300
G1 X37.108522007180866 Y18.550405930969188 F300
G1 X37.21256151993771 Y18.493237493200777 F300
G1 X37.3254984375 Y18.444219921875007 F300
G1 X37.44102262100941 Y18.406200482858047 F300
G1 X37.56391676867621 Y18.377697526463926 F300
G1 X37.69447912964313 Y18.359675499864043 F300
G1 X37.83303541666667 Y18.35335208333334 F300
G0 X19.22674166666667 Y36.46884375
G1 X19.228173592059193 Y36.638363176248916 F300
G1 X19.220717960897964 Y36.79432374900975 F300
G1 X19.20537456084492 Y36.93788946545906 F300
G1 X19.183017081533393 Y37.070149155344765 F300
G1 X19.154396408861253 Y37.192118447949674 F300
G1 X19.120143981481483 Y37.304740895061734 F300
G1 X19.0660346550263 Y37.44310831679125 F300
G1 X19.00353759108068 Y37.5681093026772 F300
G1 X18.93342881151843 Y37.68111767802601 F300
G1 X18.85626875703347 Y37.78334068654807 F300
G1 X18.772422685185187 Y37.87581952160494 F300
G1 X18.679419747781193 Y37.96168736446357 F300
G1 X18.5800646553731 Y38.038620979789826 F300
G1 X18.47457134475136 Y38.10720771174426 F300
G1 X18.363077944043244 Y38.16793129749816 F300
G1 X18.24566666666667 Y38.22117916666667 F300
G1 X18.433686197916668 Y38.28692812500001 F300
G1 X18.508384885214355 Y38.30602328566516 F300
G1 X18.596549025420874 Y38.320544931230714 F300
G1 X18.701279166666666 Y38.326483333333336 F300
G1 X18.786378543702998 Y38.3220593756038 F300
G1 X18.87162926817166 Y38.30893954089607 F300
G1 X18.956662654670954 Y38.28723292876609 F300
G1 X19.04106204427083 Y38.25690205078125 F300
G1 X19.121907083661682 Y38.219051370053904 F300
G1 X19.199820783204522 Y38.17349156639815 F300
G1 X19.2743316470001 Y38.120227882427486 F300
G1 X19.344878125 Y38.05915494791667 F300
G1 X19.40896405215826 Y37.992158685909615 F300
G1 X19.467146897157118 Y37.91839378838833 F300
G1 X19.518858991604343 Y37.83768027142962 F300
G1 X19.56336608072917 Y37.74973714192709 F300
G1 X19.598242231525205 Y37.65880010771305 F300
G1 X19.62452483592495 Y37.561405735811974 F300
G1 X19.64125303961282 Y37.457044156004635 F300
G1 X19.647164583333335 Y37.345143750000005 F300
G1 X19.64317225440246 Y37.239629597274686 F300
G1 X19.630544322298345 Y37.13242125768455 F300
G1 X19.608192438271608 Y37.024586342592606 F300
G1 X19.575727350787773 Y36.91965039800539 F300
G1 X19.532020785113097 Y36.81767369447988 F300
G1 X19.475792978395063 Y36.719551157407416 F300
G1 X19.426282274571697 Y36.65139733828374 F300
G1 X19.368895824088888 Y36.586608127637135 F300
G1 X19.30273879642996 Y36.525573965097024 F300
G1 X19.22674166666667 Y36.46884375 F300
G0 X41.68722083333333 Y11.800681249999998
G1 X41.647606602102286 Y11.876327940408022 F300
G1 X41.595220517600765 Y11.952644379307221 F300
G1 X41.529527374148095 Y12.028979843390658 F300
G1 X41.449840586419754 Y12.104383719135804 F300
G1 X41.36538611292324 Y12.170466514180141 F300
G1 X41.27047750872627 Y12.232204688024074 F300
G1 X41.165006392733524 Y12.288497337651302 F300
G1 X41.048830246913575 Y12.338001003086418 F300
G1 X40.93083206702096 Y12.376587842359228 F300
G1 X40.80521250242015 Y12.405949683799715 F300
G1 X40.67194324943237 Y12.424768495905068 F300
G1 X40.530991666666665 Y12.431447916666663 F300
G1 X40.37363711811747 Y12.425294351996353 F300
G1 X40.24225638606548 Y12.409591325064692 F300
G1 X40.132595312499994 Y12.387758593749995 F300
G1 X40.02418419563481 Y12.356932652576477 F300
G1 X39.936423495926036 Y12.324049850523961 F300
G1 X39.86556458333333 Y12.29148333333333 F300
G1 X39.87889266832058 Y12.360317043001345 F300
G1 X39.90238089980004 Y12.430178514962654 F300
G1 X39.93684120278817 Y12.500514269789852 F300
G1 X39.983451157407416 Y12.57054035493827 F300
G1 X40.03721895113607 Y12.632551054306582 F300
G1 X40.10240546817852 Y12.691381032491481 F300
G1 X40.180413565034634 Y12.746009584450993 F300
G1 X40.27296412037037 Y12.79497561728395 F300
G1 X40.34739705408872 Y12.824811701385181 F300
G1 X40.43044446743774 Y12.849989904226636 F300
G1 X40.52311625829741 Y12.869581547230538 F300
G1 X40.62652209465321 Y12.882416458424048 F300
G1 X40.74186458333334 Y12.887060416666664 F300
G1 X40.867317732929386 Y12.880564647680485 F300
G1 X40.98148042992826 Y12.862303451500681 F300
G1 X41.08544664831478 Y12.833802139164845 F300
G1 X41.18020061848959 Y12.796192578125002 F300
G1 X41.27144000619926 Y12.747285356483461 F300
G1 X41.35317376518698 Y12.690268352867433 F300
G1 X41.42603615115244 Y12.62578243527807 F300
G1 X41.490470052083325 Y12.554214583333334 F300
G1 X41.546767287749695 Y12.475649472372991 F300
G1 X41.59422172752552 Y12.391450586678562 F300
G1 X41.63292603144324 Y12.301868909576628 F300
G1 X41.66277581380208 Y12.207064713541666 F300
G1 X41.682983787046226 Y12.110187124608979 F300
G1 X41.69400016939471 Y12.01001749030245 F300
G1 X41.695559599057425 Y11.90677333637196 F300
G1 X41.68722083333333 Y11.800681249999998 F300
G0 X41.476877083333335 Y10.293879166666668
G1 X41.40311037373265 Y10.372863966775766 F300
G1 X41.31811706839759 Y10.449137674393038 F300
G1 X41.22129938271605 Y10.52131304012346 F300
G1 X41.11836129253532 Y10.584210304432984 F300
G1 X41.00483679745765 Y10.639708833032643 F300
G1 X40.880055478395064 Y10.686187654320992 F300
G1 X40.78451882276927 Y10.712566460759017 F300
G1 X40.68312217693126 Y10.732537396926785 F300
G1 X40.575470004185114 Y10.745264857488955 F300
G1 X40.46114166666666 Y10.749756250000004 F300
G1 X40.318518568856675 Y10.744189136537965 F300
G1 X40.19372677905002 Y10.729216621168456 F300
G1 X40.08440989841963 Y10.707072914002634 F300
G1 X39.988458641975306 Y10.679553472222228 F300
G1 X39.891120484516456 Y10.642599027758997 F300
G1 X39.80706462847417 Y10.602060975462255 F300
G1 X39.734477171142984 Y10.559427766176142 F300
G1 X39.67176219135803 Y10.515864583333338 F300
G1 X39.59144105333853 Y10.449054913343044 F300
G1 X39.52852030575421 Y10.386084657663927 F300
G1 X39.47953749999999 Y10.329068750000003 F300
G1 X39.47136662533654 Y10.408351168201602 F300
G1 X39.472739237126866 Y10.489239897433944 F300
G1 X39.483641203308125 Y10.571372020667653 F300
G1 X39.50429671223959 Y10.654340885416671 F300
G1 X39.53357756379442 Y10.733980605701385 F300
G1 X39.57190366171857 Y10.81180551831623 F300
G1 X39.61951215936248 Y10.887288827593999 F300
G1 X39.67681744791666 Y10.959769270833338 F300
G1 X39.74068240323831 Y11.0250009250438 F300
G1 X39.81332801972231 Y11.085043035127528 F300
G1 X39.89530063222394 Y11.139148342483258 F300
G1 X39.98730185546875 Y11.186318750000002 F300
G1 X40.08197980053915 Y11.222629330901771 F300
G1 X40.18598466832829 Y11.250465739632286 F300
G1 X40.30028552876542 Y11.268487580911014 F300
G1 X40.42595208333333 Y11.274954166666667 F300
G1 X40.55839271286721 Y11.268846753461226 F300
G1 X40.67833728151632 Y11.25176281725301 F300
G1 X40.78706239450917 Y11.225283514288845 F300
G1 X40.88573177083333 Y11.190643033854167 F300
G1 X40.98220140186822 Y11.145107582254262 F300
G1 X41.06854661406547 Y11.092379275493958 F300
G1 X41.145627793467604 Y11.033273500618316 F300
G1 X41.21414583333333 Y10.968368229166668 F300
G1 X41.276170311443195 Y10.896053210782142 F300
G1 X41.32944663924049 Y10.819294188411616 F300
G1 X41.374372672314784 Y10.738535285363671 F300
G1 X41.411194270833334 Y10.654117643229169 F300
G1 X41.43999030319878 Y10.56635743534379 F300
G1 X41.46046638743934 Y10.476817462670613 F300
G1 X41.472759452094785 Y10.38587406787613 F300
G1 X41.476877083333335 Y10.293879166666668 F300
G0 X16.563975 Y27.00866666666667
G1 X16.61738128718974 Y27.125936680327627 F300
G1 X16.678588782396652 Y27.237780798780292 F300
G1 X16.747288639784387 Y27.344336007985106 F300
G1 X16.823253373899142 Y27.445695259439653 F300
G1 X16.906326234567903 Y27.541900077160506 F300
G1 X16.995617670325874 Y27.632184533522892 F300
G1 X17.09100396944635 Y27.71668494373989 F300
G1 X17.19231722608391 Y27.795375097593595 F300
G1 X17.299430571763533 Y27.868178374784325 F300
G1 X17.412248765432096 Y27.934963117283953 F300
G1 X17.557913749277603 Y28.00819352973595 F300
G1 X17.710430752714405 Y28.07110775113162 F300
G1 X17.869551138630353 Y28.123399178673182 F300
G1 X18.035058333333332 Y28.164631250000003 F300
G1 X18.10861562369494 Y28.26772505965807 F300
G1 X18.186411570852165 Y28.364029197203628 F300
G1 X18.267527864583332 Y28.453853906250004 F300
G1 X18.396443214084627 Y28.57963442917375 F300
G1 X18.526389583333334 Y28.690093750000003 F300
G1 X17.33497083333333 Y33.666112500000004 F300
G1 X17.2681050243832 Y33.8416799975545 F300
G1 X17.208940972222223 Y34.02162430555557 F300
G1 X17.17534825560894 Y34.14364600545468 F300
G1 X17.14613460834328 Y34.27204216936261 F300
G1 X17.122069444444442 Y34.40835694444445 F300
G1 X17.104876067946105 Y34.545500679276515 F300
G1 X17.093705920077234 Y34.69452265484581 F300
G1 X17.089702083333332 Y34.857531249999994 F300
G1 X17.09755035688957 Y35.120695020850675 F300
G1 X17.11686597222222 Y35.373968518518524 F300
G1 X17.167313194444446 Y35.83590162037037 F300
G1 X17.187425543145558 Y36.03813199760982 F300
G1 X17.194477083333332 Y36.18865 F300
G1 X17.188703211707715 Y36.269425128235476 F300
G1 X17.173935071968504 Y36.33153646106055 F300
G1 X17.153006095679014 Y36.37947337962964 F300
G1 X17.12293441165869 Y36.422105235480615 F300
G1 X17.088125899315074 Y36.45374888762896 F300
G1 X17.04932862654321 Y36.47663425925926 F300
G1 X17.006437119088737 Y36.492261167649374 F300
G1 X16.96128573625059 Y36.50101213185321 F300
G1 X16.914547916666663 Y36.50376875 F300
G1 X16.838901529103598 Y36.50313608553627 F300
G1 X16.783083072916664 Y36.499403125 F300
G1 X16.74895794582836 Y36.49287070052548 F300
G1 X16.723272369688942 Y36.48280706710746 F300
G1 X16.704204166666663 Y36.46884375 F300
G1 X16.704204166666663 Y36.32887916666667 F300
G1 X16.698263421611628 Y36.176971164467986 F300
G1 X16.68098099311164 Y36.032257479202656 F300
G1 X16.653033580752368 Y35.89473452750151 F300
G1 X16.614923828124997 Y35.76439889322916 F300
G1 X16.56500899393919 Y35.63682373495436 F300
G1 X16.50539100893349 Y35.518326696863184 F300
G1 X16.43637499336914 Y35.408820213820775 F300
G1 X16.35806302083333 Y35.30831510416667 F300
G1 X16.288064257036737 Y35.23389761305215 F300
G1 X16.212429336396625 Y35.16608291853041 F300
G1 X16.131037834099327 Y35.10492840963265 F300
G1 X16.043685067649943 Y35.050590789695875 F300
G1 X15.950092057291663 Y35.00334147135416 F300
G1 X15.85426587151223 Y34.965094688603884 F300
G1 X15.752541516615434 Y34.93431617899131 F300
G1 X15.644491593261264 Y34.91146616782028 F300
G1 X15.529641319871839 Y34.897162866249374 F300
G1 X15.407481249999996 Y34.89219166666666 F300
G1 X15.286106178384038 Y34.89727539734667 F300
G1 X15.169092564163721 Y34.912012356036506 F300
G1 X15.056332582418456 Y34.935744106593965 F300
G1 X14.947731430558797 Y34.96795365709381 F300
G1 X14.843224218749997 Y35.008252799479166 F300
G1 X14.741355038564835 Y35.05712819625118 F300
G1 X14.644779565995256 Y35.113201505308766 F300
G1 X14.553503006938337 Y35.17610918981539 F300
G1 X14.467577555254753 Y35.245578157108625 F300
G1 X14.387115624999998 Y35.32141197916666 F300
G1 X14.312515929985674 Y35.403223494890696 F300
G1 X14.244559026331547 Y35.49008933107259 F300
G1 X14.183355376283185 Y35.581794203730034 F300
G1 X14.129086841957232 Y35.67818033337174 F300
G1 X14.082017968749996 Y35.77913287760416 F300
G1 X14.043042049305749 Y35.8829479029194 F300
G1 X14.012118293344134 Y35.98989675121523 F300
G1 X13.989504802903198 Y36.09990128590701 F300
G1 X13.97556817003848 Y36.21290972533267 F300
G1 X13.970793749999997 Y36.32887916666667 F300
G1 X13.975599242411255 Y36.4449665132431 F300
G1 X13.98959380990484 Y36.557410608977506 F300
G1 X14.012245471096842 Y36.666251117970354 F300
G1 X14.043149466216665 Y36.771517028734 F300
G1 X14.082017968749998 Y36.873209765625 F300
G1 X14.129097474580732 Y36.972103490348005 F300
G1 X14.183364933383 Y37.066207072723955 F300
G1 X14.24455996338012 Y37.15546963794661 F300
G1 X14.3125094673256 Y37.23979268692826 F300
G1 X14.387115624999996 Y37.31901614583333 F300
G1 X14.46741093697189 Y37.39212026296415 F300
G1 X14.55323650180009 Y37.45900685360406 F300
G1 X14.644498057136591 Y37.519506234889846 F300
G1 X14.741158440588153 Y37.573370355829724 F300
G1 X14.843224218749997 Y37.62026080729167 F300
G1 X14.947554039343448 Y37.658707692701114 F300
G1 X15.056083801049681 Y37.68942339973967 F300
G1 X15.16886379077754 Y37.712039480303794 F300
G1 X15.285968499682847 Y37.72607093363089 F300
G1 X15.407481249999996 Y37.730906250000004 F300
G1 X15.515621886111013 Y37.72989784015722 F300
G1 X15.644018749999995 Y37.722075781250005 F300
G1 X15.730922458901183 Y37.710581517253765 F300
G1 X15.826914471618908 Y37.69100030342766 F300
G1 X15.932943749999998 Y37.6602625 F300
G1 X15.9842404062549 Y37.776007211044664 F300
G1 X16.047286202190673 Y37.89006465127104 F300
G1 X16.12187816440027 Y38.001904867875 F300
G1 X16.207911979166663 Y38.11088098958333 F300
G1 X16.301396325931005 Y38.21222978902605 F300
G1 X16.40376980149314 Y38.30789710037087 F300
G1 X16.514695058022394 Y38.39719931377763 F300
G1 X16.63389114583333 Y38.479346354166665 F300
G1 X16.75842865137577 Y38.55198983017819 F300
G1 X16.888647620584226 Y38.6150940055517 F300
G1 X17.02423854413049 Y38.667971798643045 F300
G1 X17.164942968749997 Y38.7097984375 F300
G1 X17.279206649750726 Y38.734320341130285 F300
G1 X17.395389071852236 Y38.750708286860785 F300
G1 X17.513454672188843 Y38.758544936931386 F300
G1 X17.63337788117811 Y38.757311675675815 F300
G1 X17.755129166666663 Y38.746377083333336 F300
G1 X17.6387207696273 Y38.8834347733695 F300
G1 X17.515607904328625 Y39.012174020914024 F300
G1 X17.385967782873067 Y39.13263681330674 F300
G1 X17.249924688638412 Y39.24481751191503 F300
G1 X17.10755655864197 Y39.348656944444464 F300
G1 X16.95924286555869 Y39.44383217410656 F300
G1 X16.805508312639528 Y39.52997116563987 F300
G1 X16.646396882499587 Y39.606982133823955 F300
G1 X16.481917667081994 Y39.67470775942369 F300
G1 X16.312052469135796 Y39.7329201388889 F300
G1 X16.14013123194444 Y39.78049373612292 F300
G1 X15.963770396416644 Y39.81810833021985 F300
G1 X15.782918620999324 Y39.84548006721108 F300
G1 X15.597511804690743 Y39.86224308998122 F300
G1 X15.407481249999995 Y39.867945833333344 F300
G1 X15.202594188445433 Y39.862918914202076 F300
G1 X15.002413370778864 Y39.84812651426045 F300
G1 X14.806912402725994 Y39.82395987464451 F300
G1 X14.61606366465432 Y39.790756454247024 F300
G1 X14.42984287762092 Y39.748801692362505 F300
G1 X14.248233716666666 Y39.698330983333356 F300
G1 X14.067123027880164 Y39.638049237485674 F300
G1 X13.891719002727612 Y39.569557664898966 F300
G1 X13.72200243928746 Y39.49309365747074 F300
G1 X13.557968200730718 Y39.40884604100688 F300
G1 X13.399629976574102 Y39.316957633257864 F300
G1 X13.24702498333333 Y39.217528033333345 F300
G1 X13.099076073513341 Y39.1097376772075 F300
G1 X12.957837672130166 Y38.99498550103984 F300
G1 X12.823338314863236 Y38.87336373131215 F300
G1 X12.695637711439423 Y38.74492293677558 F300
G1 X12.574831506018883 Y38.60967551480826 F300
G1 X12.461055849999996 Y38.46759938333334 F300
G1 X12.355534823137544 Y38.3201862000062 F300
G1 X12.257749703630871 Y38.166699306861375 F300
G1 X12.167839362577594 Y38.00709015988957 F300
G1 X12.085993060954511 Y37.841279340476774 F300
G1 X12.01245475919043 Y37.6691610049578 F300
G1 X11.947527116666663 Y37.490607433333345 F300
G1 X11.89323466415747 Y37.31154604163612 F300
G1 X11.847888019998173 Y37.12687104860413 F300
G1 X11.811819370698121 Y36.936420788487105 F300
G1 X11.78542874446511 Y36.7400191586396 F300
G1 X11.769187182268041 Y36.53748053328915 F300
G1 X11.76363958333333 Y36.32861458333335 F300
G1 X11.768990971261417 Y36.13471343806861 F300
G1 X11.784712113356974 Y35.9450542954167 F300
G1 X11.810355683903584 Y35.75957250574312 F300
G1 X11.845541573779117 Y35.57820570850035 F300
G1 X11.889953637958296 Y35.400899205875646 F300
G1 X11.943336116666666 Y35.22761136666669 F300
G1 X12.00642504748911 Y35.055968023095474 F300
G1 X12.077969939900711 Y34.88932434628719 F300
G1 X12.157714102293093 Y34.72767143557209 F300
G1 X12.245450162246659 Y34.57101809397826 F300
G1 X12.34101623388199 Y34.41939542860266 F300
G1 X12.444291849999997 Y34.272861350000014 F300
G1 X12.555063184620385 Y34.131662783257596 F300
G1 X12.67268736760166 Y33.99652403660078 F300
G1 X12.797019164893712 Y33.867505546770914 F300
G1 X12.927948179427409 Y33.74469615195601 F300
G1 X13.06539479623239 Y33.628216989115884 F300
G1 X13.209305983333328 Y33.51822523333335 F300
G1 X13.357952113689178 Y33.416023458929494 F300
G1 X13.511997751833057 Y33.32110250663649 F300
G1 X13.67137679011288 Y33.23359893892569 F300
G1 X13.836046511689943 Y33.153688319689664 F300
G1 X14.005983206617007 Y33.08158866938844 F300
G1 X14.181177716666664 Y33.01756371666668 F300
G1 X14.35766233725713 Y32.96304092981909 F300
G1 X14.538305623795734 Y32.91708600439608 F300
G1 X14.723113012546635 Y32.8799484788005 F300
G1 X14.912100699848672 Y32.851930167850426 F300
G1 X15.105290753464308 Y32.83338814904748 F300
G1 X15.302706249999995 Y32.82473750000001 F300
G1 X16.563975 Y27.00866666666667 F300
G0 X21.995077083333335 Y19.474656250000002
G1 X22.12379397672975 Y19.480194829296718 F300
G1 X22.254461768283644 Y19.49686677091247 F300
G1 X22.387301663282713 Y19.52486255827367 F300
G1 X22.52251766476625 Y19.564507759572024 F300
G1 X22.660283958034594 Y19.616253760597072 F300
G1 X22.800733333333334 Y19.680667447916672 F300
G1 X22.93095460987713 Y19.75086343646488 F300
G1 X23.062854069933252 Y19.832266731564342 F300
G1 X23.19642177794604 Y19.925369211393374 F300
G1 X23.3316066555835 Y20.030717604614253 F300
G1 X23.468311699544802 Y20.148907427997223 F300
G1 X23.606389583333335 Y20.280577083333338 F300
G1 X24.21295005000001 Y20.871330283333343 F300
G1 X24.868392816666667 Y21.509276683333336 F300
G1 X25.20286227143423 Y21.828481267305296 F300
G1 X25.52895368333333 Y22.132198983333335 F300
G1 X25.853108141661487 Y22.42353069669086 F300
G1 X26.150868450000004 Y22.677879883333336 F300
G1 X26.350848095324398 Y22.838746302623733 F300
G1 X26.53063371940186 Y22.973991967646086 F300
G1 X26.690372916666668 Y23.084102083333335 F300
G1 X26.92574636227181 Y23.232062475799157 F300
G1 X27.133624641857242 Y23.35274349128272 F300
G1 X27.31837615740741 Y23.44994243827161 F300
G1 X27.46257618756694 Y23.517773911635597 F300
G1 X27.59610783906081 Y23.573213890503595 F300
G1 X27.720565783887118 Y23.617649438987936 F300
G1 X27.837371064814814 Y23.65232908950618 F300
G1 X27.95861853417156 Y23.68055321078205 F300
G1 X28.07563564589132 Y23.699873564208005 F300
G1 X28.18961446511772 Y23.71101465305851 F300
G1 X28.301685416666665 Y23.714604166666675 F300
G1 X28.406700071751924 Y23.7109607083138 F300
G1 X28.503498480310082 Y23.69978409323439 F300
G1 X28.59366898975055 Y23.680680857208632 F300
G1 X28.678650520833337 Y23.653187760416674 F300
G1 X28.759688368805598 Y23.616765092958413 F300
G1 X28.839950600566553 Y23.56942484808974 F300
G1 X28.920600227913305 Y23.509365545327643 F300
G1 X29.002831250000007 Y23.434410416666672 F300
G1 X30.194250000000004 Y24.345106250000008 F300
G1 X29.99899401733972 Y24.49648842898123 F300
G1 X29.81605042719376 Y24.650769222376574 F300
G1 X29.644859752087402 Y24.807949753996045 F300
G1 X29.484899871398405 Y24.968053883456392 F300
G1 X29.335686407707303 Y25.131128313470246 F300
G1 X29.196773102642194 Y25.29724256500038 F300
G1 X29.067752160493832 Y25.466488811728407 F300
G1 X28.944563858113078 Y25.64458714967268 F300
G1 X28.831076452971114 Y25.82643516678605 F300
G1 X28.727007743869134 Y26.012189192343392 F300
G1 X28.63211442351338 Y26.20202537107334 F300
G1 X28.54619177903989 Y26.396138865473674 F300
G1 X28.469073242610115 Y26.594742967005992 F300
G1 X28.40062978395062 Y26.798068132716057 F300
G1 X28.332978199495745 Y27.036289918133196 F300
G1 X28.27641569239922 Y27.281471036133695 F300
G1 X28.230938852284233 Y27.53399752368456 F300
G1 X28.19659414221158 Y27.794274456287617 F300
G1 X28.173475349799745 Y28.06272431206956 F300
G1 X28.161720833333334 Y28.339785416666672 F300
G1 X27.809910291730223 Y28.143065997717603 F300
G1 X27.471594383955473 Y27.9391250266975 F300
G1 X27.145336825785787 Y27.72868741014392 F300
G1 X26.829754589843752 Y27.512437467447924 F300
G1 X26.518529078617703 Y27.287327794362266 F300
G1 X26.214921562653174 Y27.05699979130603 F300
G1 X25.91775141554361 Y26.822113300370663 F300
G1 X25.62585494791667 Y26.583315885416674 F300
G1 X25.05061806949049 Y26.09420031125713 F300
G1 X24.480940852864585 Y25.595208756510424 F300
G1 X23.91050124819427 Y25.09370429198868 F300
G1 X23.32593125 Y24.590904166666675 F300
G1 X23.191988690235146 Y24.490897272710118 F300
G1 X23.083798302469148 Y24.41541682098767 F300
G1 X23.01212397300176 Y24.371368670711128 F300
G1 X22.945003855160138 Y24.336665440735075 F300
G1 X22.880059336419762 Y24.31042623456791 F300
G1 X22.81284759704997 Y24.291365853845427 F300
G1 X22.740599202393824 Y24.279583015842213 F300
G1 X22.660504166666673 Y24.27552083333334 F300
G1 X22.601637293193928 Y24.280279218925877 F300
G1 X22.542566873145528 Y24.29467017410058 F300
G1 X22.48183841407131 Y24.319169797900148 F300
G1 X22.41793024691359 Y24.35461165123458 F300
G1 X22.338615982495785 Y24.41015204176226 F300
G1 X22.24856444361785 Y24.48490414701183 F300
G1 X22.14425308641976 Y24.581575154320994 F300
G1 X21.78473333333334 Y24.94094791666667 F300
G1 X21.67132463331851 Y25.060229852950155 F300
G1 X21.584935687814827 Y25.16251272989148 F300
G1 X21.51990501543211 Y25.251137577160502 F300
G1 X21.462618679148648 Y25.344948693885918 F300
G1 X21.42231099376844 Y25.429350428218335 F300
G1 X21.395070679012353 Y25.506881867283955 F300
G1 X21.376479953417736 Y25.587065690572537 F300
G1 X21.36666684688258 Y25.66646628415472 F300
G1 X21.363781250000006 Y25.74686875 F300
G1 X21.370205894583904 Y25.897325714357525 F300
G1 X21.38573339843751 Y26.020712500000002 F300
G1 X21.40828217974471 Y26.13893885122057 F300
G1 X21.434028125000005 Y26.255067187500003 F300
G1 X21.459146740576386 Y26.37447943741855 F300
G1 X21.482322851562508 Y26.515714843750004 F300
G1 X21.49771314560867 Y26.668663960069622 F300
G1 X21.504275000000007 Y26.868437500000002 F300
G1 X21.49942890446923 Y27.011204005089372 F300
G1 X21.48551954902848 Y27.1459931069637 F300
G1 X21.463391432603746 Y27.27330958347708 F300
G1 X21.433762880317 Y27.39363271638505 F300
G1 X21.397233674934256 Y27.507410666720315 F300
G1 X21.354293457031257 Y27.615054459635424 F300
G1 X21.291261612546005 Y27.743232251052287 F300
G1 X21.219782730000844 Y27.861799878087254 F300
G1 X21.140591074228944 Y27.971278648997835 F300
G1 X21.054264833890535 Y28.07210066033347 F300
G1 X20.961250781250005 Y28.164598177083334 F300
G1 X20.860228892402553 Y28.25029636161444 F300
G1 X20.754196361223194 Y28.32689488508086 F300
G1 X20.64363428145795 Y28.39462405872761 F300
G1 X20.528950189888327 Y28.453625595331083 F300
G1 X20.410499902343755 Y28.503946972656255 F300
G1 X20.28815099510142 Y28.545674868976548 F300
G1 X20.164280344454735 Y28.578089375892283 F300
G1 X20.039287917302694 Y28.601288451735602 F300
G1 X19.913540764645642 Y28.615280222944456 F300
G1 X19.787393750000003 Y28.61997916666667 F300
G1 X19.64539908079004 Y28.614616298487093 F300
G1 X19.51108682443951 Y28.599254067179803 F300
G1 X19.384153355522 Y28.574853688683994 F300
G1 X19.264305549833594 Y28.542214230671416 F300
G1 X19.15127662037038 Y28.501984799382726 F300
G1 X19.039142560512648 Y28.451862463401234 F300
G1 X18.93528566383521 Y28.394989850437547 F300
G1 X18.839448633832006 Y28.331975340999573 F300
G1 X18.751427308172666 Y28.26329632110802 F300
G1 X18.671087268518527 Y28.189315895061732 F300
G1 X18.5961695434654 Y28.10767975910337 F300
G1 X18.53026252508966 Y28.022055777003747 F300
G1 X18.47321391170017 Y27.9327586429007 F300
G1 X18.424977686967217 Y27.84000642235896 F300
G1 X18.385631250000007 Y27.74394375 F300
G1 X18.242467444280404 Y27.72821001863264 F300
G1 X18.107242148994462 Y27.70344400342471 F300
G1 X17.97956105595897 Y27.670461147030483 F300
G1 X17.859054006536883 Y27.629942459236865 F300
G1 X17.745385058593754 Y27.582444563802085 F300
G1 X17.633208783234682 Y27.525618811955045 F300
G1 X17.528796570337498 Y27.462544424006218 F300
G1 X17.43186767326759 Y27.393720993911835 F300
G1 X17.34219164666903 Y27.31954897598708 F300
G1 X17.259597656250005 Y27.24034244791667 F300
G1 X17.18222502399989 Y27.154234671296443 F300
G1 X17.112815454953424 Y27.064225931434002 F300
G1 X17.051222262858793 Y26.970614872234243 F300
G1 X16.99737013243787 Y26.873635682361638 F300
G1 X16.951262988281254 Y26.77347275390625 F300
G1 X16.91279308379957 Y26.669671316404717 F300
G1 X16.882706065305374 Y26.56404857740756 F300
G1 X16.861016163938608 Y26.45675922853949 F300
G1 X16.847834415871958 Y26.34792878653416 F300
G1 X16.843375000000005 Y26.237670833333333 F300
G1 X16.849828354175152 Y26.1093754672611 F300
G1 X16.86563307291667 Y26.000868750000002 F300
G1 X16.889186201579506 Y25.89939582690513 F300
G1 X16.914283333333337 Y25.817247916666663 F300
G1 X16.828761909567568 Y25.76158032237433 F300
G1 X16.74329927787319 Y25.69691151680201 F300
G1 X16.658922557187346 Y25.622950620293004 F300
G1 X16.576812191358034 Y25.539347222222222 F300
G1 X16.502355815959707 Y25.45089289570251 F300
G1 X16.43348598021877 Y25.35455040641492 F300
G1 X16.37130016925316 Y25.25006180510252 F300
G1 X16.317069753086425 Y25.137092361111115 F300
G1 X16.28193541698848 Y25.044890375915546 F300
G1 X16.25323160349459 Y24.94798802135298 F300
G1 X16.23163073547699 Y24.846076588436766 F300
G1 X16.21794347774333 Y24.73881294920128 F300
G1 X16.213137500000002 Y24.625829166666662 F300
G1 X16.21740176745486 Y24.5059135311424 F300
G1 X16.22993413676792 Y24.388529516395835 F300
G1 X16.250409998041153 Y24.273990951228967 F300
G1 X16.278590031231463 Y24.162605242566332 F300
G1 X16.314316126543215 Y24.054691743827156 F300
G1 X16.358320451504905 Y23.94883257186574 F300
G1 X16.409286467239397 Y23.848692655722612 F300
G1 X16.467009990090315 Y23.754479586545404 F300
G1 X16.531387305624676 Y23.66643527260304 F300
G1 X16.602408179012354 Y23.584860339506168 F300
G1 X16.68051118279832 Y23.509819278705493 F300
G1 X16.764537847707413 Y23.442914022352547 F300
G1 X16.854640765002564 Y23.384381714343697 F300
G1 X16.951088434008096 Y23.3346121924253 F300
G1 X17.05424791666667 Y23.294181249999998 F300
G1 X17.01832844914373 Y23.357114451002186 F300
G1 X16.989312736337304 Y23.42925483842488 F300
G1 X16.967573644256447 Y23.511875961388107 F300
G1 X16.95379485672516 Y23.606447662272455 F300
G1 X16.94894375000001 Y23.714604166666664 F300
G1 X16.954746248378616 Y23.792992595322925 F300
G1 X16.97152109642405 Y23.868308796541374 F300
G1 X16.99865484477369 Y23.94046379086188 F300
G1 X17.035932870370385 Y24.00925200617284 F300
G1 X17.081881657701963 Y24.07234815529694 F300
G1 X17.136358066494747 Y24.1298638850859 F300
G1 X17.199315228300303 Y24.181340567234997 F300
G1 X17.270912268518526 Y24.226053549382716 F300
G1 X17.3465479944415 Y24.26104839692695 F300
G1 X17.42889302312637 Y24.28749694053855 F300
G1 X17.518227637519132 Y24.304422720563025 F300
G1 X17.614900000000006 Y24.310445833333336 F300
G1 X17.7189566182431 Y24.306244028440346 F300
G1 X17.81345852450353 Y24.293695610984134 F300
G1 X17.900503009259268 Y24.272816203703712 F300
G1 X17.984532475816213 Y24.242392958167358 F300
G1 X18.06615244766814 Y24.201680278505428 F300
G1 X18.14694768518519 Y24.149461574074078 F300
G1 X18.2224779099496 Y24.08948330076386 F300
G1 X18.301529281101313 Y24.015351975149983 F300
G1 X18.385631250000007 Y23.924683333333334 F300
G1 X18.544202324234675 Y23.717154217912682 F300
G1 X18.708922685185197 Y23.51208032407408 F300
G1 X18.882666207903977 Y23.30996778930859 F300
G1 X19.07878078703704 Y23.099477314814816 F300
G1 X19.216117879973275 Y22.962169056887063 F300
G1 X19.369576318639982 Y22.817241668157536 F300
G1 X19.542125000000002 Y22.663414583333335 F300
G1 X19.70887228307706 Y22.52765836093148 F300
G1 X19.8791467027703 Y22.401459784890857 F300
G1 X20.05219266975309 Y22.28316913580247 F300
G1 X20.317786015199477 Y22.115630390133507 F300
G1 X20.58542608024692 Y21.957369058641973 F300
G1 X21.118777083333338 Y21.64715 F300
G1 X21.221895236702196 Y21.573774556698165 F300
G1 X21.317445701491966 Y21.4952529707455 F300
G1 X21.404419290123464 Y21.4109162808642 F300
G1 X21.464044442308275 Y21.342607733924282 F300
G1 X21.517482513279077 Y21.27043259515222 F300
G1 X21.564362965805103 Y21.1939053569521 F300
G1 X21.60421890432099 Y21.11247608024691 F300
G1 X21.635554724894185 Y21.02840400430201 F300
G1 X21.659140923280248 Y20.93832814249182 F300
G1 X21.67413589026288 Y20.841280987964694 F300
G1 X21.67942916666667 Y20.736189583333328 F300
G1 X21.67517449600481 Y20.666475541369312 F300
G1 X21.662320062514183 Y20.595805722083572 F300
G1 X21.64055165487448 Y20.524518941225885 F300
G1 X21.609324382716057 Y20.453046219135796 F300
G1 X21.57083488548211 Y20.386473942065983 F300
G1 X21.52342238099338 Y20.321917977961743 F300
G1 X21.46644082326764 Y20.259924749468215 F300
G1 X21.399049228395064 Y20.201241280864192 F300
G1 X21.327270163252734 Y20.15121250380205 F300
G1 X21.24567608391515 Y20.106135572363407 F300
G1 X21.153211514530724 Y20.066981856108068 F300
G1 X21.048662500000002 Y20.035043749999996 F300
G1 X21.097738168683584 Y19.940091409990973 F300
G1 X21.153043204478887 Y19.856001112576383 F300
G1 X21.214092099278236 Y19.781749855100713 F300
G1 X21.28059845409416 Y19.716484096781425 F300
G1 X21.35245271694541 Y19.659527655403465 F300
G1 X21.42969557291667 Y19.610387500000005 F300
G1 X21.528546844416283 Y19.561815791215558 F300
G1 X21.634369550846543 Y19.52401624721544 F300
G1 X21.747274815140912 Y19.4968134207845 F300
G1 X21.867443758905132 Y19.480267240466535 F300
G1 X21.995077083333335 Y19.474656250000002 F300
G0 X19.997208333333333 Y26.307256250000005
G1 X19.983530996693197 Y26.44762344091869 F300
G1 X19.95738966953509 Y26.58205217920615 F300
G1 X19.919669902764763 Y26.710706994028982 F300
G1 X19.871029020391752 Y26.833714927713753 F300
G1 X19.811921604938274 Y26.95113449074075 F300
G1 X19.74219693622648 Y27.063557065208983 F300
G1 X19.663494069888404 Y27.168666748657774 F300
G1 X19.57625231821433 Y27.26640943575343 F300
G1 X19.480779768055285 Y27.3566370535479 F300
G1 X19.37727978395062 Y27.439084953703713 F300
G1 X19.26752767583943 Y27.5123487280362 F300
G1 X19.15184259823218 Y27.576297485658618 F300
G1 X19.03045125179708 Y27.630678363662398 F300
G1 X18.903509273124573 Y27.67510096725036 F300
G1 X18.771129166666668 Y27.709018750000006 F300
G1 X18.82714714713649 Y27.744831995143347 F300
G1 X18.901019984567903 Y27.785640123456798 F300
G1 X18.98303100215381 Y27.821771650861468 F300
G1 X19.08529737654321 Y27.854206404320994 F300
G1 X19.156984596027417 Y27.8694065997818 F300
G1 X19.238640740958495 Y27.87992170420322 F300
G1 X19.33178125 Y27.883908333333338 F300
G1 X19.423757230069786 Y27.878943504224768 F300
G1 X19.511661521272302 Y27.86468164810852 F300
G1 X19.59562949441647 Y27.841895392341968 F300
G1 X19.67576025390625 Y27.811143782552087 F300
G1 X19.752882490108213 Y27.772350523166644 F300
G1 X19.82499945904835 Y27.72676801246866 F300
G1 X19.89207197338972 Y27.674845334353236 F300
G1 X19.95398203125 Y27.61691067708334 F300
G1 X20.010356730983077 Y27.553389376061645 F300
G1 X20.06029913148144 Y27.485410750521716 F300
G1 X20.103658398599023 Y27.413297552707313 F300
G1 X20.140178417968748 Y27.337299837239588 F300
G1 X20.169277384590828 Y27.258263537778785 F300
G1 X20.190509484325595 Y27.17698968789443 F300
G1 X20.20359213480918 Y27.093654049254205 F300
G1 X20.20808125 Y27.008402083333337 F300
G1 X20.20383713522902 Y26.89211397083853 F300
G1 X20.192754816024078 Y26.79368425324171 F300
G1 X20.176693827160495 Y26.709618904320994 F300
G1 X20.153914089684925 Y26.62682769027071 F300
G1 X20.127505583564876 Y26.554024962780872 F300
G1 X20.09862214506173 Y26.488917206790127 F300
G1 X20.049021655938702 Y26.395027148724242 F300
G1 X19.997208333333333 Y26.307256250000005 F300
G0 X23.886847916666664 Y7.8761166666666655
G1 X23.82135178020625 Y7.965879555186024 F300
G1 X23.769193893633915 Y8.054474076726502 F300
G1 X23.729321614583334 Y8.143279687500002 F300
G1 X23.700360361409025 Y8.23599293019297 F300
G1 X23.682754614429733 Y8.333294383223695 F300
G1 X23.676768750000004 Y8.437033333333336 F300
G1 X23.681571676764886 Y8.521311189379528 F300
G1 X23.695410611478998 Y8.600985149649768 F300
G1 X23.717626900648224 Y8.67629625526614 F300
G1 X23.747808594349753 Y8.747441456639873 F300
G1 X23.785767283950623 Y8.814534953703708 F300
G1 X23.831062471680283 Y8.877021973461055 F300
G1 X23.88326938369976 Y8.934488035946282 F300
G1 X23.942355256522838 Y8.986872403379765 F300
G1 X24.008422874107097 Y9.033977454654849 F300
G1 X24.08167924382716 Y9.075443518518522 F300
G1 X24.157018073690185 Y9.108671984397443 F300
G1 X24.238098545489493 Y9.135581502257743 F300
G1 X24.325114094854612 Y9.155701989425982 F300
G1 X24.41829440717438 Y9.168394723712886 F300
G1 X24.517879166666667 Y9.172839583333335 F300
G1 X24.63244256298158 Y9.166576406183612 F300
G1 X24.741076402872903 Y9.148939030280498 F300
G1 X24.845107495277297 Y9.121437735556777 F300
G1 X24.945776033333342 Y9.085336583333337 F300
G1 X25.076485720363433 Y9.025821865889526 F300
G1 X25.2056543343308 Y8.95539196529541 F300
G1 X25.33514110000001 Y8.876675583333336 F300
G1 X25.52815660678298 Y8.753042028740914 F300
G1 X25.731326066666668 Y8.627628583333333 F300
G1 X25.871194482050136 Y8.5503982774922 F300
G1 X26.01987110754452 Y8.479806372664076 F300
G1 X26.179682633333336 Y8.418967583333336 F300
G1 X26.30143421842747 Y8.383532907495358 F300
G1 X26.431931179585867 Y8.355979477682874 F300
G1 X26.57273452786422 Y8.337965694892809 F300
G1 X26.725562500000002 Y8.331464583333334 F300
G1 X26.899385236147303 Y8.33791257692613 F300
G1 X27.06139099243658 Y8.355860252861183 F300
G1 X27.213255052461392 Y8.383422484613407 F300
G1 X27.356515433333342 Y8.418967583333336 F300
G1 X27.54573595320097 Y8.47964526580033 F300
G1 X27.724973997342406 Y8.55023725436989 F300
G1 X27.89663796666667 Y8.627628583333335 F300
G1 X28.398038200000002 Y8.876675583333334 F300
G1 X28.565310220171465 Y8.954588972058385 F300
G1 X28.73617501550597 Y9.025123228915712 F300
G1 X28.91282423333334 Y9.085336583333335 F300
G1 X29.047027634554713 Y9.12110208245019 F300
G1 X29.187527655601066 Y9.148649249792973 F300
G1 X29.335718594959197 Y9.166472038112866 F300
G1 X29.493104166666665 Y9.172839583333335 F300
G1 X29.5917898884305 Y9.169286896907622 F300
G1 X29.695205792741078 Y9.158414896713737 F300
G1 X29.802364929226485 Y9.13984405880178 F300
G1 X29.912162825520834 Y9.113118164062502 F300
G1 X30.018963527088868 Y9.079268345235132 F300
G1 X30.123478099463288 Y9.037868577146813 F300
G1 X30.224616167331206 Y8.988785886076656 F300
G1 X30.32125 Y8.931804166666668 F300
G1 X30.412276767414387 Y8.866543445115848 F300
G1 X30.494902523617526 Y8.794004210411671 F300
G1 X30.568359590235332 Y8.713878237497168 F300
G1 X30.631713736979165 Y8.625672981770835 F300
G1 X30.673433683288824 Y8.550694499178395 F300
G1 X30.70737061202263 Y8.470503219698404 F300
G1 X30.732909856400646 Y8.384438629951033 F300
G1 X30.749158143906502 Y8.2917274923196 F300
G1 X30.75490208333333 Y8.191500000000001 F300
G1 X30.751941182551878 Y8.138762605108338 F300
G1 X30.74316256722343 Y8.08744776321517 F300
G1 X30.72860911458333 Y8.038140885416666 F300
G1 X30.70804187514031 Y7.991215030489602 F300
G1 X30.681925371030378 Y7.948614119353413 F300
G1 X30.65012708333333 Y7.910777083333333 F300
G1 X30.80026440916248 Y7.916272382886292 F300
G1 X30.944644126325667 Y7.932390586574652 F300
G1 X31.083567171521143 Y7.958677595897901 F300
G1 X31.21731587095218 Y7.994807984008686 F300
G1 X31.34614234683655 Y8.040582368662452 F300
G1 X31.470256868489585 Y8.095923404947916 F300
G1 X31.58988365936713 Y8.160910330215716 F300
G1 X31.704433620975028 Y8.235233350883345 F300
G1 X31.814012385197483 Y8.318992204304136 F300
G1 X31.918657869352064 Y8.412388102541623 F300
G1 X32.01833127646121 Y8.515715379030253 F300
G1 X32.11290911458333 Y8.629352343749998 F300
G1 X32.19696721243376 Y8.745963058351505 F300
G1 X32.27574191563293 Y8.871931387769605 F300
G1 X32.34900254420929 Y9.00765668493018 F300
G1 X32.41643827459063 Y9.15358671358486 F300
G1 X32.47765459446859 Y9.310210077387161 F300
G1 X32.53217034505208 Y9.478048860677083 F300
G1 X32.57547366970204 Y9.640974754919545 F300
G1 X32.61216499098311 Y9.813544044690714 F300
G1 X32.64176194352733 Y9.996184795182002 F300
G1 X32.66371365896471 Y10.18933890893384 F300
G1 X32.67739936681833 Y10.393457728354942 F300
G1 X32.682127083333334 Y10.608997916666668 F300
G1 X32.68002283669831 Y11.291109801073961 F300
G1 X32.67458328333334 Y11.863520850000004 F300
G1 X32.66584479328268 Y12.40372721792753 F300
G1 X32.655304683333334 Y12.865669383333339 F300
G1 X32.62932048333333 Y13.69955561666667 F300
G1 X32.601659883333326 Y14.449291650000006 F300
G1 X32.57735208333333 Y15.198989583333338 F300
G1 X32.71440912813813 Y15.207634948170016 F300
G1 X32.849524826533255 Y15.222985756005354 F300
G1 X32.98217291736704 Y15.24539987281176 F300
G1 X33.111833700000005 Y15.275267900000008 F300
G1 X33.23953773117311 Y15.31354422777399 F300
G1 X33.36214409886516 Y15.360000900351892 F300
G1 X33.4793365509927 Y15.415052315464644 F300
G1 X33.590765516666664 Y15.479206616666671 F300
G1 X33.675259926092565 Y15.537323234822603 F300
G1 X33.75531578599713 Y15.601752098692923 F300
G1 X33.830794927397534 Y15.672935605113933 F300
G1 X33.90148922690353 Y15.751399388293942 F300
G1 X33.96710673333333 Y15.837755133333337 F300
G1 X34.0240107982844 Y15.92709048179357 F300
G1 X34.07567283780767 Y16.024809410001634 F300
G1 X34.12162931091499 Y16.131818328397685 F300
G1 X34.16126777803804 Y16.249129892266573 F300
G1 X34.193816549999994 Y16.377862850000007 F300
G1 X34.2159659657505 Y16.502349272825228 F300
G1 X34.23109809225816 Y16.638188965832942 F300
G1 X34.23824105917105 Y16.786601479324638 F300
G1 X34.23626047582883 Y16.948896895700468 F300
G1 X34.22385416666666 Y17.12647916666667 F300
G1 X34.12859603674048 Y17.051323308395144 F300
G1 X34.03115007937536 Y16.98716209495797 F300
G1 X33.931286841046 Y16.933422002454687 F300
G1 X33.82870881369896 Y16.889673658068244 F300
G1 X33.72305614138594 Y16.85563832532218 F300
G1 X33.613913760110606 Y16.831192400425767 F300
G1 X33.50081954277 Y16.81636956022522 F300
G1 X33.38327291666666 Y16.81136041666667 F300
G1 X33.29851698899785 Y16.81572457689922 F300
G1 X33.2185201324827 Y16.828294163031053 F300
G1 X33.14309780632388 Y16.848440971145504 F300
G1 X33.07209112633843 Y16.87573556132692 F300
G1 X33.005398919753084 Y16.909932407407414 F300
G1 X32.942349827147396 Y16.95143847404988 F300
G1 X32.8846619027451 Y16.9991935913952 F300
G1 X32.83232935236352 Y17.05311190691685 F300
G1 X32.78547008469435 Y17.11324946653409 F300
G1 X32.74435316358024 Y17.179778009259266 F300
G1 X32.71105612598849 Y17.249033021251602 F300
G1 X32.68414776308989 Y17.32361882396753 F300
G1 X32.66405162994134 Y17.403785025273457 F300
G1 X32.651377720277445 Y17.489833607025012 F300
G1 X32.64693749999999 Y17.582091666666674 F300
G1 X32.65133619791666 Y17.919534635416674 F300
G1 X32.66170009886328 Y18.098583378371295 F300
G1 X32.682127083333334 Y18.282972916666676 F300
G1 X36.78184583333332 Y18.38827708333334 F300
G1 X36.68789288180958 Y18.445017143883152 F300
G1 X36.59906262287434 Y18.509907385205043 F300
G1 X36.51563845477119 Y18.582706391438478 F300
G1 X36.43799529320987 Y18.663277160493834 F300
G1 X36.36778327365124 Y18.74999821968825 F300
G1 X36.304968233841144 Y18.84297701749933 F300
G1 X36.24995202242582 Y18.942104790845757 F300
G1 X36.20327067901234 Y19.04734436728396 F300
G1 X36.16648478481618 Y19.155701673307306 F300
G1 X36.13927999118787 Y19.268761034117446 F300
G1 X36.12230538348733 Y19.386598171173446 F300
G1 X36.116418749999994 Y19.50931666666667 F300
G1 X36.122292480698256 Y19.629118807632583 F300
G1 X36.13918315352622 Y19.73677204982652 F300
G1 X36.16623190620465 Y19.833682758343695 F300
G1 X36.202914587371346 Y19.921102347810738 F300
G1 X36.249058758937416 Y20.000096016281347 F300
G1 X36.30484988262538 Y20.071509727770945 F300
G1 X36.370824715048045 Y20.135939846237854 F300
G1 X36.4478524022318 Y20.1937099779923 F300
G1 X36.53710625 Y20.244858333333337 F300
G1 X36.346543761135486 Y20.63962234133966 F300
G1 X36.16948240740741 Y20.997588117283957 F300
G1 X35.991695137512444 Y21.343494037614256 F300
G1 X35.81773356481481 Y21.66471049382717 F300
G1 X35.63745554993045 Y21.976817563249405 F300
G1 X35.45046249999999 Y22.277387500000003 F300
G1 X35.378855534715775 Y22.381931098097755 F300
G1 X35.30295657222327 Y22.483890793468817 F300
G1 X35.22093155864198 Y22.58078618827161 F300
G1 X35.1545778925662 Y22.648328023056777 F300
G1 X35.08322120471281 Y22.710366782426767 F300
G1 X35.0058269521854 Y22.766049253660064 F300
G1 X34.921256635802465 Y22.814393672839508 F300
G1 X34.851787373270156 Y22.845375191270556 F300
G1 X34.77645652783609 Y22.871050476133345 F300
G1 X34.6942528699422 Y22.89069284778253 F300
G1 X34.60404601784661 Y22.90336355958631 F300
G1 X34.50457708333334 Y22.907889583333336 F300
G1 X34.322031886360875 Y22.91060937137561 F300
G1 X34.11324283396133 Y22.90736252538425 F300
G1 X33.878184616126546 Y22.897661477623462 F300
G1 X33.520413743574714 Y22.873560041712896 F300
G1 X33.126254706790135 Y22.836736265432105 F300
G1 X32.72487590180436 Y22.79002448400038 F300
G1 X32.31008984375 Y22.73293385416667 F300
G1 X31.895687407368747 Y22.66716208866128 F300
G1 X31.4909925154321 Y22.594074151234576 F300
G1 X31.094237784318878 Y22.512792903772898 F300
G1 X30.730265210262345 Y22.427977064043215 F300
G1 X30.492203000859085 Y22.3656976292148 F300
G1 X30.278394275371177 Y22.30370879489878 F300
G1 X30.089210416666663 Y22.24246250000001 F300
G1 X29.93287538368104 Y22.185882616845863 F300
G1 X29.77818737249083 Y22.120391834890928 F300
G1 X29.626027363887964 Y22.045143245591728 F300
G1 X29.47732425130208 Y21.959213639322922 F300
G1 X29.36375675242329 Y21.883691004466485 F300
G1 X29.253909506250466 Y21.80082411187079 F300
G1 X29.148158792416645 Y21.710037673547028 F300
G1 X29.046936104615476 Y21.61068815400602 F300
G1 X28.95074140625 Y21.50205911458334 F300
G1 X28.864288047820743 Y21.38918761075786 F300
G1 X28.78352701663568 Y21.26644522239146 F300
G1 X28.709020353251436 Y21.132816999224055 F300
G1 X28.641476805530665 Y20.987172052211093 F300
G1 X28.581767545572916 Y20.82826044921876 F300
G1 X28.54260296329613 Y20.69901040019341 F300
G1 X28.50890826364057 Y20.560449675961394 F300
G1 X28.481301229134246 Y20.411722556598995 F300
G1 X28.460499560901074 Y20.251913567621834 F300
G1 X28.447325161815723 Y20.080045870322483 F300
G1 X28.442708333333332 Y19.895079166666676 F300
G1 X28.450692016312484 Y19.56190613519932 F300
G1 X28.474507958680213 Y19.166724557211847 F300
G1 X28.513273535156248 Y18.70087402343751 F300
G1 X28.665917447916666 Y17.096052083333344 F300
G1 X28.717837676795128 Y16.488394787369355 F300
G1 X28.76784664719792 Y15.808944798892874 F300
G1 X28.812062532552083 Y15.051095768229176 F300
G1 X28.836410177428895 Y14.489330170185287 F300
G1 X28.854343685362384 Y13.884767500152662 F300
G1 X28.863958805236823 Y13.234747861660935 F300
G1 X28.86313125 Y12.536487500000009 F300
G1 X28.859611541613482 Y12.401356158936844 F300
G1 X28.84976789605106 Y12.28904454532256 F300
G1 X28.834609262080477 Y12.195791751476612 F300
G1 X28.815035879629633 Y12.118347839506184 F300
G1 X28.78588593014423 Y12.040398668375781 F300
G1 X28.751181053162945 Y11.97630243594469 F300
G1 X28.711156471343195 Y11.923395131339884 F300
G1 X28.665693287037037 Y11.87953688271606 F300
G1 X28.613786013546992 Y11.84274904087112 F300
G1 X28.55419875099328 Y11.811865921051773 F300
G1 X28.485860950005474 Y11.78628764558959 F300
G1 X28.407518749999998 Y11.76549166666668 F300
G1 X28.29060894269729 Y11.740874794835145 F300
G1 X28.123178483072916 Y11.714981054687513 F300
G1 X27.9427782440001 Y11.694287595860716 F300
G1 X27.737163802083334 Y11.677716145833347 F300
G1 X27.527402570800753 Y11.668123957107284 F300
G1 X27.31835732421875 Y11.666744205729179 F300
G1 X27.17929201673733 Y11.671397015327637 F300
G1 X27.051158820399678 Y11.68084538543622 F300
G1 X26.935641666666662 Y11.695112500000015 F300
G1 X26.875710963907885 Y11.706878071229085 F300
G1 X26.817236639319557 Y11.725102685399271 F300
G1 X26.759958288062126 Y11.750728200944017 F300
G1 X26.703680478395064 Y11.784923842592605 F300
G1 X26.65325330561239 Y11.824682202615532 F300
G1 X26.602907930870956 Y11.874716895167978 F300
G1 X26.552620572756915 Y11.937169783914486 F300
G1 X26.50252854938272 Y12.014611574074086 F300
G1 X26.461382221131718 Y12.092279991643355 F300
G1 X26.420310117295777 Y12.185576860704154 F300
G1 X26.379702649581173 Y12.297367100152716 F300
G1 X26.340064583333334 Y12.430918750000016 F300
G1 X26.30324543250355 Y12.568144199550867 F300
G1 X26.257960846052747 Y12.704505040107572 F300
G1 X26.20380825653782 Y12.839172424511286 F300
G1 X26.14031656901042 Y12.971276464843768 F300
G1 X26.06803668196125 Y13.098119736552427 F300
G1 X25.986389819375063 Y13.219451371527382 F300
G1 X25.894858806230772 Y13.334562961007975 F300
G1 X25.792807031249996 Y13.44265234375002 F300
G1 X25.705293520417946 Y13.52159833797004 F300
G1 X25.610917229203086 Y13.59487262464215 F300
G1 X25.509160636298134 Y13.662070217566932 F300
G1 X25.399426838652065 Y13.722679414394456 F300
G1 X25.28104085286458 Y13.77606455078127 F300
G1 X25.162190029188395 Y13.818656021248403 F300
G1 X25.034483845053835 Y13.853545762456573 F300
G1 X24.896991917180014 Y13.879886348020799 F300
G1 X24.748701968861067 Y13.89663323841038 F300
G1 X24.588522916666665 Y13.90253125000002 F300
G1 X24.445769116125792 Y13.897192070076441 F300
G1 X24.306516735869707 Y13.88153627618805 F300
G1 X24.171010174642497 Y13.85601467966458 F300
G1 X24.039491589648524 Y13.820960081205122 F300
G1 X23.912223111979166 Y13.776593717447938 F300
G1 X23.787818325707125 Y13.722214755644698 F300
G1 X23.669938430372206 Y13.659258371237216 F300
G1 X23.558771512038565 Y13.587960414132178 F300
G1 X23.454557687195702 Y13.508436421376683 F300
G1 X23.357615104166662 Y13.420691927083354 F300
G1 X23.268687907052303 Y13.325013863208373 F300
G1 X23.18875849242241 Y13.222073402206808 F300
G1 X23.118118520344716 Y13.111728330373648 F300
G1 X23.057219521719446 Y12.993719851661087 F300
G1 X23.006703190104165 Y12.86769208984377 F300
G1 X22.97457153511136 Y12.761713024897144 F300
G1 X22.950157462531877 Y12.650783013186036 F300
G1 X22.933945899755674 Y12.534566865119292 F300
G1 X22.926559219221875 Y12.412699161571322 F300
G1 X22.9287665224516 Y12.284795047715892 F300
G1 X22.941491666666664 Y12.15046041666669 F300
G1 X22.8303024076045 Y12.074994182142946 F300
G1 X22.731337157621784 Y11.994180374169865 F300
G1 X22.643625118188595 Y11.908762114974738 F300
G1 X22.56634189814815 Y11.819309876543233 F300
G1 X22.49626938058591 Y11.722400658738449 F300
G1 X22.436736571618543 Y11.622968430324121 F300
G1 X22.387123255733528 Y11.521508900883815 F300
G1 X22.346943518518522 Y11.418426929012368 F300
G1 X22.315206470207038 Y11.311536792118162 F300
G1 X22.292987439344472 Y11.204991991741664 F300
G1 X22.279863680968482 Y11.099191687368325 F300
G1 X22.275535416666667 Y10.994495833333357 F300
G1 X22.282335241827877 Y10.834917761310775 F300
G1 X22.301204084681945 Y10.686950551538693 F300
G1 X22.330123591765588 Y10.550376098656407 F300
G1 X22.367411979166665 Y10.42494713541669 F300
G1 X22.41647830895769 Y10.299500688620018 F300
G1 X22.47112050108353 Y10.189540933474488 F300
G1 X22.52962241488681 Y10.094332222945535 F300
G1 X22.590654166666667 Y10.013156250000023 F300
G1 X22.542610903634255 Y9.894906789063977 F300
G1 X22.507937577160497 Y9.795296373456816 F300
G1 X22.4815469915591 Y9.69753322626627 F300
G1 X22.464085339506173 Y9.600602237654346 F300
G1 X22.454445076498423 Y9.500303666432995 F300
G1 X22.45121875 Y9.382389583333358 F300
G1 X22.45704615543761 Y9.250347211652517 F300
G1 X22.47392166849677 Y9.124122777539782 F300
G1 X22.50084573587478 Y9.003434690361583 F300
G1 X22.53700976043366 Y8.888025541500506 F300
G1 X22.581774088541668 Y8.777680240885429 F300
G1 X22.63595556770372 Y8.669869617294923 F300
G1 X22.697405126078444 Y8.568350305595233 F300
G1 X22.765478605662253 Y8.47303748165414 F300
G1 X22.839631347834366 Y8.383893279199375 F300
G1 X22.91939895833333 Y8.300938281250003 F300
G1 X23.02788755914473 Y8.204882286392266 F300
G1 X23.141785990330384 Y8.120768720648003 F300
G1 X23.260064761214018 Y8.04855845611702 F300
G1 X23.381841015625 Y7.988353743489583 F300
G1 X23.484103543492886 Y7.948005608526545 F300
G1 X23.586086479876123 Y7.916662062499899 F300
G1 X23.687411785932554 Y7.8942210924031215 F300
G1 X23.787760861082422 Y7.880673537007917 F300
G1 X23.886847916666664 Y7.8761166666666655 F300
G0 X18.946283333333334 Y25.36137083333334
G1 X18.888334261632018 Y25.4634688870185 F300
G1 X18.821206049452122 Y25.55724066690109 F300
G1 X18.74529381930587 Y25.64303468857833 F300
G1 X18.66079791666667 Y25.72104737654322 F300
G1 X18.569140107191878 Y25.790361682353897 F300
G1 X18.47019828788673 Y25.851378069458935 F300
G1 X18.364071259346552 Y25.904012470368528 F300
G1 X18.250781944444448 Y25.948020679012348 F300
G1 X18.134925345512816 Y25.981855057240743 F300
G1 X18.013602837501033 Y26.006589411854833 F300
G1 X17.886891189250456 Y26.021836480400175 F300
G1 X17.754864583333337 Y26.0270625 F300
G1 X17.600592868834806 Y26.020801458849768 F300
G1 X17.465840364583332 Y26.005234375 F300
G1 X17.337865979767454 Y25.982205248618307 F300
G1 X17.22940208333333 Y25.957212499999997 F300
G1 X17.251485954079058 Y26.025371701197844 F300
G1 X17.283327989351974 Y26.091738717082677 F300
G1 X17.32510641635011 Y26.15609145445132 F300
G1 X17.377264969135805 Y26.218023070987655 F300
G1 X17.435403394865666 Y26.272656297561802 F300
G1 X17.502492275456845 Y26.323108490630485 F300
G1 X17.578990562493892 Y26.368717682449343 F300
G1 X17.665474614197528 Y26.408572067901233 F300
G1 X17.753609970190585 Y26.43889117275257 F300
G1 X17.85012362062801 Y26.462088341265932 F300
G1 X17.955563952589532 Y26.477058966968215 F300
G1 X18.0705125 Y26.482410416666664 F300
G1 X18.191100993987025 Y26.475943797425128 F300
G1 X18.30235904720266 Y26.45748786198647 F300
G1 X18.40487499407456 Y26.42817513860819 F300
G1 X18.499175459384325 Y26.388772375524788 F300
G1 X18.58566604938272 Y26.339702006172843 F300
G1 X18.66621400665429 Y26.27968228711466 F300
G1 X18.73776748524648 Y26.210662177413347 F300
G1 X18.800467162474995 Y26.132600487615314 F300
G1 X18.854166914243148 Y26.045181875303655 F300
G1 X18.898383950617283 Y25.947873688271606 F300
G1 X18.930018450429454 Y25.84878891923782 F300
G1 X18.95171501243961 Y25.741265949024537 F300
G1 X18.96256195252101 Y25.62465852878129 F300
G1 X18.96129506363038 Y25.49826407225408 F300
G1 X18.946283333333334 Y25.36137083333334 F300
G0 X25.078266666666668 Y11.800681249999998
G1 X25.038652435435623 Y11.876327940408022 F300
G1 X24.98626635093411 Y11.952644379307221 F300
G1 X24.92057320748144 Y12.028979843390658 F300
G1 X24.840886419753094 Y12.104383719135804 F300
G1 X24.75643194625658 Y12.170466514180141 F300
G1 X24.661523342059613 Y12.232204688024074 F300
G1 X24.556052226066864 Y12.288497337651302 F300
G1 X24.439876080246915 Y12.338001003086418 F300
G1 X24.321877900354295 Y12.376587842359228 F300
G1 X24.196258335753484 Y12.405949683799715 F300
G1 X24.062989082765696 Y12.424768495905067 F300
G1 X23.9220375 Y12.431447916666663 F300
G1 X23.764446254331073 Y12.425290832409868 F300
G1 X23.633007154870988 Y12.409585113196533 F300
G1 X23.5233765625 Y12.387758593749995 F300
G1 X23.41500177238733 Y12.35694861647304 F300
G1 X23.32715921475414 Y12.32406682461328 F300
G1 X23.25608125 Y12.29148333333333 F300
G1 X23.26952707651794 Y12.360314324506747 F300
G1 X23.293113949445647 Y12.430177096428466 F300
G1 X23.32765355407287 Y12.500514774576828 F300
G1 X23.374320601851856 Y12.57054035493827 F300
G1 X23.428128503659188 Y12.632559070258392 F300
G1 X23.493332323504614 Y12.6913916829145 F300
G1 X23.57132937977176 Y12.746017155189417 F300
G1 X23.663833564814816 Y12.79497561728395 F300
G1 X23.73823741389566 Y12.8248153734212 F300
G1 X23.821237640585217 Y12.849994234205163 F300
G1 X23.913841598710665 Y12.869584565572513 F300
G1 X24.01715623297713 Y12.882417508436479 F300
G1 X24.13238125 Y12.887060416666664 F300
G1 X24.257833269920777 Y12.880564782589877 F300
G1 X24.371996663751162 Y12.862303785207345 F300
G1 X24.475965880386 Y12.833802485296083 F300
G1 X24.570725553385415 Y12.796192578125002 F300
G1 X24.661971028527105 Y12.747286547727619 F300
G1 X24.743716468852284 Y12.690269996746142 F300
G1 X24.816596070482312 Y12.625783646491572 F300
G1 X24.88105286458333 Y12.554214583333334 F300
G1 X24.93737798799069 Y12.475649608115598 F300
G1 X24.984867506261512 Y12.391450266634637 F300
G1 X25.023614554929487 Y12.301868254068832 F300
G1 X25.05351572265625 Y12.207064713541666 F300
G1 X25.073784320898927 Y12.110182945246713 F300
G1 X25.084870539796704 Y12.01001112903852 F300
G1 X25.086510902598242 Y11.90676800832935 F300
G1 X25.078266666666668 Y11.800681249999998 F300
G0 X22.09985208333333 Y8.752681250000006
G1 X22.05245225855065 Y8.859207940514791 F300
G1 X22.016437044016186 Y8.964141968229635 F300
G1 X21.990314583333333 Y9.067833072916672 F300
G1 X21.972447240963653 Y9.173375085037682 F300
G1 X21.962469884142656 Y9.278423315604751 F300
G1 X21.95935833333333 Y9.38318333333334 F300
G1 X21.962444435788825 Y9.487481361903376 F300
G1 X21.971421513166135 Y9.584866156896629 F300
G1 X21.985915885416667 Y9.676738541666674 F300
G1 X22.00642064007397 Y9.767461770030483 F300
G1 X22.03266440288965 Y9.85621250454751 F300
G1 X22.064662499999997 Y9.944100000000008 F300
G1 X22.00237717781062 Y10.063779083767361 F300
G1 X21.947126788183827 Y10.18669699018852 F300
G1 X21.89921892498475 Y10.31306188675432 F300
G1 X21.859015104166662 Y10.443104166666673 F300
G1 X21.82738919583918 Y10.574877859971695 F300
G1 X21.804112959999287 Y10.710589855279888 F300
G1 X21.789692427399608 Y10.850600345604692 F300
G1 X21.784733333333328 Y10.995289583333346 F300
G1 X21.789831648007276 Y11.126688114384002 F300
G1 X21.80467027270121 Y11.25531089426885 F300
G1 X21.82865379077428 Y11.381035529979247 F300
G1 X21.86129591049383 Y11.503730555555569 F300
G1 X21.902620855652938 Y11.624324136807717 F300
G1 X21.951526593065857 Y11.740331258760508 F300
G1 X22.007526130785923 Y11.851572467200205 F300
G1 X22.070208950617282 Y11.957843750000011 F300
G1 X22.14014659623058 Y12.060153378651684 F300
G1 X22.215422869062536 Y12.155796488716621 F300
G1 X22.295600459310418 Y12.244613304590292 F300
G1 X22.380310416666664 Y12.326408333333346 F300
G1 X20.207816666666663 Y21.75245416666668 F300
G1 X20.03286078959641 Y21.8429016250771 F300
G1 X19.859907374933055 Y21.93919840996682 F300
G1 X19.69078776041666 Y22.041412239583345 F300
G1 X19.526162606111363 Y22.150449861526297 F300
G1 X19.37099089044274 Y22.264298231750743 F300
G1 X19.226741666666666 Y22.382956250000017 F300
G1 X19.048884176094205 Y22.539024463250183 F300
G1 X18.89209749348958 Y22.683655208333352 F300
G1 X18.74245049979308 Y22.829066672981067 F300
G1 X18.60024140625 Y22.974432291666687 F300
G1 X18.4604979772833 Y23.123761826230357 F300
G1 X18.314983365885414 Y23.284854687500022 F300
G1 X18.00013333333333 Y23.644489583333353 F300
G1 X17.928703053937582 Y23.712253002781676 F300
G1 X17.865351779429414 Y23.764083519665242 F300
G1 X17.807384374999998 Y23.80228046875002 F300
G1 X17.745377721417903 Y23.831713639740173 F300
G1 X17.68208625824108 Y23.849214106934987 F300
G1 X17.614635416666665 Y23.855097916666683 F300
G1 X17.54511701194601 Y23.84954544963707 F300
G1 X17.484689596190098 Y23.833736850913873 F300
G1 X17.43280787037037 Y23.808364660493844 F300
G1 X17.39864132233531 Y23.78238704221116 F300
G1 X17.36982861135158 Y23.750834932507065 F300
G1 X17.346428662373704 Y23.713095683237906 F300
G1 X17.328944212962966 Y23.66820408950619 F300
G1 X17.319327820356847 Y23.6223385643432 F300
G1 X17.315994037958678 Y23.569074293393008 F300
G1 X17.320382093431064 Y23.50702722070057 F300
G1 X17.33444166666667 Y23.434675000000013 F300
G1 X17.789525 Y21.262181250000012 F300
G1 X18.735675 Y20.595960416666678 F300
G1 X21.363516666666666 Y9.31306875000001 F300
G1 X22.09985208333333 Y8.752681250000006 F300
G0 X24.868187499999998 Y10.293879166666668
G1 X24.7943460878623 Y10.372869123334603 F300
G1 X24.709309184541553 Y10.449142915520627 F300
G1 X24.61247260802469 Y10.52131304012346 F300
G1 X24.50952058907082 Y10.584208142759797 F300
G1 X24.395974189383683 Y10.639706964625404 F300
G1 X24.271150308641975 Y10.686187654320992 F300
G1 X24.175586047874575 Y10.71256265754276 F300
G1 X24.074132811825866 Y10.73253385271261 F300
G1 X23.966387886244704 Y10.745263467204826 F300
G1 X23.851922916666666 Y10.749756250000004 F300
G1 X23.709439042747984 Y10.744190903179327 F300
G1 X23.584725790724516 Y10.729220972064816 F300
G1 X23.47544293813132 Y10.70707741722201 F300
G1 X23.379494675925933 Y10.679553472222228 F300
G1 X23.28216520005858 Y10.642598992216296 F300
G1 X23.198110388740506 Y10.602060936092752 F300
G1 X23.125524394399626 Y10.559427746185062 F300
G1 X23.06281782407407 Y10.515864583333338 F300
G1 X22.98251948904776 Y10.449040224570444 F300
G1 X22.919684522214745 Y10.386071408352883 F300
G1 X22.870847916666666 Y10.329068750000003 F300
G1 X22.8626799335648 Y10.40835043156426 F300
G1 X22.864060256492117 Y10.489238628267117 F300
G1 X22.874973877610323 Y10.571370868803085 F300
G1 X22.895644335937497 Y10.654340885416671 F300
G1 X22.924940799625283 Y10.73397993102251 F300
G1 X22.96328310864147 Y10.811804744765439 F300
G1 X23.010907447625478 Y10.887288344089372 F300
G1 X23.068227083333333 Y10.959769270833338 F300
G1 X23.132104605316115 Y11.025002821257832 F300
G1 X23.20475790500066 Y11.085045483202487 F300
G1 X23.286731249910464 Y11.139150046953546 F300
G1 X23.378723893229164 Y11.186318750000002 F300
G1 X23.473395450945137 Y11.222631415854703 F300
G1 X23.577381551355224 Y11.250467700993887 F300
G1 X23.69164838731605 Y11.268488356540397 F300
G1 X23.8172625 Y11.274954166666667 F300
G1 X23.949703129533876 Y11.268846753461226 F300
G1 X24.069647698182987 Y11.25176281725301 F300
G1 X24.178372811175837 Y11.225283514288845 F300
G1 X24.2770421875 Y11.190643033854167 F300
G1 X24.37351181853488 Y11.145107582254266 F300
G1 X24.459857030732127 Y11.092379275493954 F300
G1 X24.536938210134267 Y11.033273500618316 F300
G1 X24.60545625 Y10.968368229166668 F300
G1 X24.667480728109858 Y10.896053210782142 F300
G1 X24.720757055907157 Y10.819294188411614 F300
G1 X24.765683088981444 Y10.738535285363671 F300
G1 X24.802504687499997 Y10.654117643229169 F300
G1 X24.83130071986545 Y10.56635743534379 F300
G1 X24.851776804106002 Y10.476817462670613 F300
G1 X24.864069868761447 Y10.38587406787613 F300
G1 X24.868187499999998 Y10.293879166666668 F300
G0 X7.558087499999999 Y7.666302083333338
G1 X9.695656249999999 Y9.313068750000003 F300
G1 X12.324291666666666 Y20.59596041666667 F300
G1 X13.2699125 Y21.262181250000005 F300
G1 X15.37255625 Y30.302200000000006 F300
G1 X14.916943749999998 Y32.40457916666667 F300
G1 X14.654829913324807 Y32.46138180601962 F300
G1 X14.40974033072602 Y32.52399753669086 F300
G1 X14.180773697916665 Y32.592995572916664 F300
G1 X14.010397723169408 Y32.65246972233825 F300
G1 X13.848803273202467 Y32.71664100280066 F300
G1 X13.695587667232486 Y32.78578762753275 F300
G1 X13.550370833333332 Y32.86019166666667 F300
G1 X7.558087499999999 Y7.666302083333338 F300
G0 X40.49580208333334 Y7.8761166666666655
G1 X40.430323995871454 Y7.9658831997914925 F300
G1 X40.37821634309684 Y8.05447708413011 F300
G1 X40.338408072916664 Y8.143279687500002 F300
G1 X40.309511123613945 Y8.235988097306112 F300
G1 X40.29195381311843 Y8.333290144715502 F300
G1 X40.2859875 Y8.437033333333336 F300
G1 X40.290790358600226 Y8.521312045115787 F300
G1 X40.304628399278464 Y8.600986604633933 F300
G1 X40.326841909632336 Y8.676297853151809 F300
G1 X40.357017807829166 Y8.747442593847103 F300
G1 X40.39496643518519 Y8.814534953703708 F300
G1 X40.440251382948276 Y8.877026748890277 F300
G1 X40.49244162830047 Y8.934494799734988 F300
G1 X40.551502301193395 Y8.986878652502728 F300
G1 X40.61753394850975 Y9.03398119986366 F300
G1 X40.69074120370371 Y9.075443518518522 F300
G1 X40.76603947386012 Y9.10867576427315 F300
G1 X40.84706477839897 Y9.135585825777572 F300
G1 X40.93400821002057 Y9.155704914087556 F300
G1 X41.02709710513059 Y9.168395711187559 F300
G1 X41.12656875 Y9.172839583333335 F300
G1 X41.24121436915192 Y9.166575339619227 F300
G1 X41.34990789676767 Y9.14893633004432 F300
G1 X41.453978625770674 Y9.121434864309132 F300
G1 X41.55466881666668 Y9.085336583333337 F300
G1 X41.685409163602145 Y9.025818670267629 F300
G1 X41.81458525947527 Y8.955388384884893 F300
G1 X41.94405928333333 Y8.876675583333336 F300
G1 X42.1370477763798 Y8.75304019107775 F300
G1 X42.34016805 Y8.627628583333333 F300
G1 X42.48000165703748 Y8.550398472903408 F300
G1 X42.62864339955907 Y8.479806573667751 F300
G1 X42.78842301666667 Y8.418967583333336 F300
G1 X42.91015058402428 Y8.38353394821112 F300
G1 X43.040629662539345 Y8.355980493351744 F300
G1 X43.18142329622287 Y8.33796611084448 F300
G1 X43.33425208333333 Y8.331464583333334 F300
G1 X43.508073920030206 Y8.337912501590521 F300
G1 X43.67008015158697 Y8.355860067176003 F300
G1 X43.82194649480317 Y8.383422292345317 F300
G1 X43.96521136666668 Y8.418967583333336 F300
G1 X44.15443786868631 Y8.479644249847725 F300
G1 X44.33369048104878 Y8.550236127466539 F300
G1 X44.505378349999994 Y8.627628583333335 F300
G1 X45.00689923333332 Y8.876675583333334 F300
G1 X45.17422829681271 Y8.954586058529728 F300
G1 X45.34517067271756 Y9.025120652424103 F300
G1 X45.52192021666666 Y9.085336583333335 F300
G1 X45.65619627281736 Y9.121100514732824 F300
G1 X45.79678410205859 Y9.148647798263308 F300
G1 X45.94507939656181 Y9.166471473091654 F300
G1 X46.10258749999999 Y9.172839583333335 F300
G1 X46.20127397154337 Y9.169286440810154 F300
G1 X46.30467580707708 Y9.158413676759634 F300
G1 X46.41180675534004 Y9.139842683302795 F300
G1 X46.52156347656249 Y9.113118164062502 F300
G1 X46.628325196902644 Y9.079267946799852 F300
G1 X46.73279527346041 Y9.037868021532576 F300
G1 X46.8338851119458 Y8.988785472902135 F300
G1 X46.93046874999999 Y8.931804166666668 F300
G1 X47.021442763768036 Y8.86654582858214 F300
G1 X47.10402008909562 Y8.794007827692754 F300
G1 X47.17743390369773 Y8.713881280684706 F300
G1 X47.24075058593749 Y8.625672981770835 F300
G1 X47.28244162965724 Y8.550698057536337 F300
G1 X47.316355778691985 Y8.470508396073873 F300
G1 X47.34187827049729 Y8.384443574354442 F300
G1 X47.35811602840232 Y8.291730592328038 F300
G1 X47.36385624999999 Y8.191500000000001 F300
G1 X47.360895349218524 Y8.138762605108337 F300
G1 X47.352116733890085 Y8.087447763215168 F300
G1 X47.33756328124999 Y8.038140885416666 F300
G1 X47.31699604180696 Y7.991215030489601 F300
G1 X47.29087953769704 Y7.948614119353412 F300
G1 X47.259081249999994 Y7.910777083333333 F300
G1 X47.409218575829144 Y7.916272382886292 F300
G1 X47.55359829299233 Y7.932390586574654 F300
G1 X47.692521338187795 Y7.958677595897901 F300
G1 X47.826270037618855 Y7.994807984008687 F300
G1 X47.95509651350321 Y8.04058236866245 F300
G1 X48.07921103515624 Y8.095923404947916 F300
G1 X48.19883782603379 Y8.160910330215714 F300
G1 X48.31338778764169 Y8.235233350883346 F300
G1 X48.42296655186415 Y8.318992204304136 F300
G1 X48.52761203601872 Y8.412388102541623 F300
G1 X48.62728544312787 Y8.515715379030253 F300
G1 X48.721863281249995 Y8.629352343749998 F300
G1 X48.80592137910041 Y8.745963058351505 F300
G1 X48.884696082299584 Y8.871931387769605 F300
G1 X48.95795671087595 Y9.00765668493018 F300
G1 X49.02539244125729 Y9.15358671358486 F300
G1 X49.08660876113524 Y9.310210077387161 F300
G1 X49.14112451171874 Y9.478048860677083 F300
G1 X49.1844278363687 Y9.640974754919545 F300
G1 X49.22111915764977 Y9.813544044690714 F300
G1 X49.25071611019399 Y9.996184795182002 F300
G1 X49.272667825631366 Y10.18933890893384 F300
G1 X49.28635353348498 Y10.393457728354939 F300
G1 X49.29108124999999 Y10.608997916666668 F300
G1 X49.286910340984086 Y11.167906379521805 F300
G1 X49.27465997624564 Y11.740487595690382 F300
G1 X49.254741520365826 Y12.326168220912056 F300
G1 X49.22759104938271 Y12.92433726851852 F300
G1 X49.18234978140536 Y13.717915346784768 F300
G1 X49.12703776780872 Y14.52656714379382 F300
G1 X49.0629124228395 Y15.348508564814816 F300
G1 X48.95490372386598 Y16.58246357660966 F300
G1 X48.83573333333332 Y17.82736041666667 F300
G1 X48.95233545158086 Y17.85899535270282 F300
G1 X49.06774077259744 Y17.90164200597624 F300
G1 X49.181527117551155 Y17.95516969240342 F300
G1 X49.29318964843749 Y18.019576074218755 F300
G1 X49.39868693373601 Y18.092391812407985 F300
G1 X49.4995693416516 Y18.174480993458186 F300
G1 X49.595268191444134 Y18.26574036844086 F300
G1 X49.685111979166656 Y18.36615130208334 F300
G1 X49.76623940128513 Y18.47280922696415 F300
G1 X49.839369768890975 Y18.586913610916906 F300
G1 X49.903846414623075 Y18.708455350430174 F300
G1 X49.958864778645825 Y18.837494108072917 F300
G1 X49.9944145470766 Y18.942831357850842 F300
G1 X50.022974416296336 Y19.052038586791774 F300
G1 X50.04410327295322 Y19.16522066251575 F300
G1 X50.05726377712177 Y19.28250113075136 F300
G1 X50.06181249999999 Y19.404012500000004 F300
G1 X50.05715923437432 Y19.50863023038052 F300
G1 X50.04325144505184 Y19.61677515187621 F300
G1 X50.02009806560463 Y19.728067720859023 F300
G1 X49.98762994791666 Y19.842063281250006 F300
G1 X49.94795138910346 Y19.952597705525964 F300
G1 X49.900329394854644 Y20.062902728941957 F300
G1 X49.844930208846314 Y20.172363045369558 F300
G1 X49.781883333333326 Y20.280312500000008 F300
G1 X49.7279869834576 Y20.211128133934547 F300
G1 X49.664691014400354 Y20.14267224300238 F300
G1 X49.59076583726741 Y20.07500690469931 F300
G1 X49.50479804154159 Y20.00829432648434 F300
G1 X49.405182812499994 Y19.942803385416674 F300
G1 X49.30760430382947 Y19.887942069283014 F300
G1 X49.19668905537191 Y19.834231799641334 F300
G1 X49.07074528983875 Y19.782069463623316 F300
G1 X48.927911820197394 Y19.731950535478596 F300
G1 X48.76614791666666 Y19.68447083333334 F300
G1 X48.51773683523629 Y19.619026151107835 F300
G1 X48.25712362259508 Y19.560596345586795 F300
G1 X47.987332175925935 Y19.50940486111112 F300
G1 X47.716138732809114 Y19.466350418311624 F300
G1 X47.44767240097653 Y19.431393384841677 F300
G1 X47.18523310185185 Y19.404365277777785 F300
G1 X46.921601477325616 Y19.38446953839651 F300
G1 X46.67683516542971 Y19.373023202532142 F300
G1 X46.45316041666666 Y19.36935208333334 F300
G1 X46.017254571191245 Y19.372715732649603 F300
G1 X45.66111856666668 Y19.381956833333344 F300
G1 X45.328710467259974 Y19.39831087412735 F300
G1 X45.05420461666667 Y19.41977108333334 F300
G1 X44.795866513785704 Y19.44891179700704 F300
G1 X44.57351596666666 Y19.482794833333337 F300
G1 X44.360078649495264 Y19.524194509057125 F300
G1 X44.16015001666666 Y19.57102808333334 F300
G1 X43.96201886063268 Y19.624115671444713 F300
G1 X43.75520416666666 Y19.68447083333334 F300
G1 X43.74198275693143 Y19.86156464194548 F300
G1 X43.71651813348541 Y20.032936203151273 F300
G1 X43.67989145220751 Y20.198972725780255 F300
G1 X43.633041080729164 Y20.360034765625006 F300
G1 X43.57589581574484 Y20.518699372729365 F300
G1 X43.51019478629762 Y20.672050703284267 F300
G1 X43.43680811402429 Y20.82025783904133 F300
G1 X43.35654322916666 Y20.963466666666672 F300
G1 X43.238913266257015 Y21.148632952148862 F300
G1 X43.11322713698824 Y21.323455600820555 F300
G1 X42.981521158854164 Y21.48811888020834 F300
G1 X42.84212152157465 Y21.64668246302278 F300
G1 X42.70220219864199 Y21.792980312443614 F300
G1 X42.56378541666666 Y21.92734375000001 F300
G1 X43.04246535 Y21.738177250000014 F300
G1 X43.26159823964526 Y21.658905564008563 F300
G1 X43.47578088333333 Y21.59104775000001 F300
G1 X43.61978879916338 Y21.55205982973778 F300
G1 X43.77213636423436 Y21.516949133356366 F300
G1 X43.93603311666665 Y21.48595525000001 F300
G1 X44.10083615085459 Y21.461200620663497 F300
G1 X44.28580620354598 Y21.43999950675632 F300
G1 X44.49552314999999 Y21.422899750000013 F300
G1 X44.822297641106616 Y21.407512245422613 F300
G1 X45.226552083333324 Y21.40188125000001 F300
G1 X45.55225110689705 Y21.40724098140006 F300
G1 X45.86871583359111 Y21.4229694898507 F300
G1 X46.17619811131152 Y21.448568887249703 F300
G1 X46.474946460023446 Y21.483578131515934 F300
G1 X46.76520495885662 Y21.527572155574063 F300
G1 X47.04721208918149 Y21.580160956605404 F300
G1 X47.32119953703703 Y21.6409886381173 F300
G1 X47.60087949873184 Y21.713477825740387 F300
G1 X47.871692682040276 Y21.794223825726757 F300
G1 X48.133869046332336 Y21.88286469096858 F300
G1 X48.38762955783707 Y21.97907223156062 F300
G1 X48.63318490602527 Y22.082550821285018 F300
G1 X48.87073420066888 Y22.193036137100194 F300
G1 X49.1004636574074 Y22.31029382716051 F300
G1 X49.33031236333922 Y22.438644950431954 F300
G1 X49.55158736957548 Y22.57349412450339 F300
G1 X49.76446963288409 Y22.7146014620951 F300
G1 X49.96912549584902 Y22.861755343319704 F300
G1 X50.16570540425485 Y23.014770882833982 F300
G1 X50.354342640637995 Y23.173488323035805 F300
G1 X50.53515208333332 Y23.337771354166676 F300
G1 X50.74019655330409 Y23.540311856299763 F300
G1 X50.93375987889955 Y23.74966761091482 F300
G1 X51.11601386893544 Y23.96561869175114 F300
G1 X51.28709359057504 Y24.187983505649278 F300
G1 X51.447094958487234 Y24.41661483856595 F300
G1 X51.5960724537037 Y24.651395756172853 F300
G1 X51.73474798085934 Y24.893544702776765 F300
G1 X51.861804169799974 Y25.140815157432712 F300
G1 X51.97728434956606 Y25.393091801468852 F300
G1 X52.081187946505295 Y25.650283440683445 F300
G1 X52.17346859211306 Y25.912318688203758 F300
G1 X52.254032407407394 Y26.179141570216057 F300
G1 X52.3222346943828 Y26.448517234269108 F300
G1 X52.37839626541526 Y26.721527086637828 F300
G1 X52.422414934867646 Y26.99811924086904 F300
G1 X52.45413887895179 Y27.278251115858176 F300
G1 X52.473365350257254 Y27.56188495249541 F300
G1 X52.47983958333332 Y27.848983333333337 F300
G1 X52.47422014498614 Y28.103136712632484 F300
G1 X52.45801905378477 Y28.34384488837771 F300
G1 X52.432151989019864 Y28.572039473903594 F300
G1 X52.39744389258124 Y28.788604074634787 F300
G1 X52.3546325277497 Y28.994376006003638 F300
G1 X52.304372150000006 Y29.190147783333348 F300
G1 X52.242631706840506 Y29.390476747360303 F300
G1 X52.173466700351796 Y29.5811866525395 F300
G1 X52.09743783141607 Y29.762935341931854 F300
G1 X52.015045342255526 Y29.93634288311319 F300
G1 X51.92673314064677 Y30.101992908904787 F300
G1 X51.83289311666666 Y30.260433933333346 F300
G1 X51.70917524555988 Y30.447932814293665 F300
G1 X51.578188333983285 Y30.625816703510658 F300
G1 X51.44057528208609 Y30.794797312816932 F300
G1 X51.29692646805684 Y30.95554381383029 F300
G1 X51.14778738333332 Y31.108685983333345 F300
G1 X50.95184678989055 Y31.29262132508406 F300
G1 X50.749686325508954 Y31.465784403765063 F300
G1 X50.542500107237835 Y31.62917417211758 F300
G1 X50.33143985 Y31.78374813333335 F300
G1 X50.04215445241309 Y31.980190355333427 F300
G1 X49.752771112896475 Y32.16304766187039 F300
G1 X49.46623541666667 Y32.33446458333335 F300
G1 X48.135381249999995 Y31.388314583333347 F300
G1 X48.37816159657796 Y31.27267665768941 F300
G1 X48.60905046863326 Y31.152977365870964 F300
G1 X48.82814160345743 Y31.029297645730963 F300
G1 X49.03553300010782 Y30.901699065503365 F300
G1 X49.231322623697906 Y30.77022311197918 F300
G1 X49.425239710368714 Y30.627464999609188 F300
G1 X49.605967779279325 Y30.48084842926602 F300
G1 X49.77372951804094 Y30.330351630861518 F300
G1 X49.928721467900736 Y30.17591532493769 F300
G1 X50.07110598958333 Y30.017442187500013 F300
G1 X50.184197497015916 Y29.876997580361575 F300
G1 X50.28781621765877 Y29.73358061935092 F300
G1 X50.38205393767683 Y29.587034788246616 F300
G1 X50.46695899876414 Y29.437175838828512 F300
G1 X50.54253148335191 Y29.283792593867716 F300
G1 X50.60871865234375 Y29.126647981770844 F300
G1 X50.66514927477237 Y28.96630231929349 F300
G1 X50.71198569884355 Y28.801798180488774 F300
G1 X50.749028916585864 Y28.632769767134324 F300
G1 X50.77599721922647 Y28.45882597557552 F300
G1 X50.792522628852055 Y28.279552963181448 F300
G1 X50.798147916666665 Y28.09451666666668 F300
G1 X50.79176570570441 Y27.899777227494724 F300
G1 X50.773190893504875 Y27.711955604555566 F300
G1 X50.743183347091644 Y27.53079856281697 F300
G1 X50.702377841297455 Y27.356064514675634 F300
G1 X50.65129146666667 Y27.187533466666686 F300
G1 X50.58856984758723 Y27.02075365375418 F300
G1 X50.51623198474927 Y26.861090988228383 F300
G1 X50.43471744059172 Y26.708399369227283 F300
G1 X50.34437450578044 Y26.562569918044936 F300
G1 X50.245469316666664 Y26.42353956666668 F300
G1 X50.13752392552871 Y26.290522898637857 F300
G1 X50.02205886292218 Y26.165263937828904 F300
G1 X49.89932870840834 Y26.047749861990717 F300
G1 X49.76952830843188 Y25.938020928836472 F300
G1 X49.63280226666666 Y25.83617726666668 F300
G1 X49.49027191572982 Y25.743006416862286 F300
G1 X49.34213368408704 Y25.65856434476028 F300
G1 X49.18853812103098 Y25.582965548307584 F300
G1 X49.02960062967354 Y25.516390046718406 F300
G1 X48.865411116666664 Y25.459088866666683 F300
G1 X48.69897620109559 Y25.41212014738111 F300
G1 X48.52868756364701 Y25.375015919801257 F300
G1 X48.35462201871783 Y25.348038145653593 F300
G1 X48.1768441858694 Y25.331529274304263 F300
G1 X47.995416666666664 Y25.325916666666682 F300
G1 X47.800650895057586 Y25.33159496100764 F300
G1 X47.61150963205416 Y25.348223113776527 F300
G1 X47.427938935233904 Y25.37525830963459 F300
G1 X47.24988565904985 Y25.41224467977702 F300
G1 X47.07730615000001 Y25.458809466666686 F300
G1 X46.905929756548844 Y25.516222307447638 F300
G1 X46.7412600831872 Y25.582742031813417 F300
G1 X46.58325840197882 Y25.658030440139317 F300
G1 X46.43191077443858 Y25.74182671619039 F300
G1 X46.287237033333334 Y25.83394206666668 F300
G1 X46.14782908901648 Y25.935395586724162 F300
G1 X46.01623410877655 Y26.04444464982358 F300
G1 X45.892478644020315 Y26.16094028069584 F300
G1 X45.7766408049678 Y26.28479901409014 F300
G1 X45.66885921666666 Y26.41599576666668 F300
G1 X45.56993448366636 Y26.553671470346554 F300
G1 X45.47995404029086 Y26.69781736186302 F300
G1 X45.399090296135675 Y26.848468049821932 F300
G1 X45.32759803910997 Y27.005705872517012 F300
G1 X45.2658226 Y27.16965186666668 F300
G1 X45.21550334408339 Y27.335602536547896 F300
G1 X45.17544920590765 Y27.507378199244776 F300
G1 X45.14609368440344 Y27.685163317296738 F300
G1 X45.12798198768974 Y27.869162745806467 F300
G1 X45.121777083333335 Y28.05959166666668 F300
G1 X45.12720375056881 Y28.259762958500385 F300
G1 X45.14318687619169 Y28.451953812614015 F300
G1 X45.16933784957925 Y28.636943454058535 F300
G1 X45.205344158461386 Y28.81547075215952 F300
G1 X45.25096967349896 Y28.98823680493119 F300
G1 X45.30605447530865 Y29.15590740740743 F300
G1 X45.371243833681106 Y29.32081509485226 F300
G1 X45.446283998575275 Y29.482361375160437 F300
G1 X45.5313094387198 Y29.64104204369819 F300
G1 X45.62651022436199 Y29.79733409026858 F300
G1 X45.73212939704968 Y29.951698893255074 F300
G1 X45.84846010802469 Y30.10458564814816 F300
G1 X45.99348729426502 Y30.276407511625052 F300
G1 X46.15377948583897 Y30.448087993807086 F300
G1 X46.33002618517247 Y30.620177037032853 F300
G1 X46.52296043371122 Y30.79324517405605 F300
G1 X46.73335416666667 Y30.96789166666668 F300
G1 X47.0590274314691 Y31.2210897852508 F300
G1 X47.421105733333356 Y31.491379316666688 F300
G1 X48.18114570000001 Y32.045245366666684 F300
G1 X48.5693009733388 Y32.33021300151968 F300
G1 X48.95126946666667 Y32.61764071666668 F300
G1 X49.20247715444781 Y32.81288637476119 F300
G1 X49.44244934655703 Y33.00604565524428 F300
G1 X49.66927243333335 Y33.196716266666684 F300
G1 X49.89130887422334 Y33.393789181885495 F300
G1 X50.092864574853564 Y33.58515920590241 F300
G1 X50.27295000000001 Y33.77062291666668 F300
G1 X50.383830842922286 Y33.89732626871766 F300
G1 X50.49190776878975 Y34.03555838042303 F300
G1 X50.59595250651043 Y34.18429482421876 F300
G1 X50.69211327660119 Y34.338208660783096 F300
G1 X50.78039123341915 Y34.49731836087549 F300
G1 X50.85969661458334 Y34.66025130208334 F300
G1 X50.92953649191894 Y34.82734170860124 F300
G1 X50.987000762882005 Y34.992934031861616 F300
G1 X51.03141533203126 Y35.15580348307292 F300
G1 X51.056616152352504 Y35.28063656378589 F300
G1 X51.0728847624176 Y35.401153896229424 F300
G1 X51.08016278159369 Y35.517098385118736 F300
G1 X51.07834166666668 Y35.62826250000001 F300
G1 X51.19552466651245 Y35.68852107445875 F300
G1 X51.308143117285994 Y35.756745853048535 F300
G1 X51.41592455638668 Y35.83282401379158 F300
G1 X51.51855074413301 Y35.91671827215763 F300
G1 X51.61564182098767 Y36.00845895061731 F300
G1 X51.70535753499242 Y36.106505950779955 F300
G1 X51.78799628299079 Y36.211344710591014 F300
G1 X51.8632168133298 Y36.32304430369655 F300
G1 X51.93058307322049 Y36.44174184701416 F300
G1 X51.98954706790124 Y36.56763132716052 F300
G1 X52.037763658852 Y36.69590092940783 F300
G1 X52.07661493190473 Y36.83042887321988 F300
G1 X52.105469235224334 Y36.971542776587775 F300
G1 X52.12352513378577 Y37.11961135866889 F300
G1 X52.12979583333334 Y37.275029166666684 F300
G1 X52.12460358898854 Y37.402574484241434 F300
G1 X52.10949761601698 Y37.52605525041066 F300
G1 X52.085081900567445 Y37.645661182226114 F300
G1 X52.05183203724093 Y37.76156683036498 F300
G1 X52.01010606226408 Y37.87392010855907 F300
G1 X51.96015657552084 Y37.98283092447919 F300
G1 X51.889769123794444 Y38.108758788264545 F300
G1 X51.80898454878026 Y38.228432675281525 F300
G1 X51.718242951568826 Y38.34184227036234 F300
G1 X51.61786775919229 Y38.44889395716424 F300
G1 X51.50809114583334 Y38.54939479166668 F300
G1 X51.39179477808498 Y38.64105592531504 F300
G1 X51.26838850453956 Y38.724748461692414 F300
G1 X51.13823249485384 Y38.8002610907804 F300
G1 X51.00163618496366 Y38.86729603015059 F300
G1 X50.858878059895844 Y38.925458658854176 F300
G1 X50.71331253849888 Y38.973351038742976 F300
G1 X50.56411522832795 Y39.01128731525981 F300
G1 X50.411601177263854 Y39.03895987723544 F300
G1 X50.25606398100045 Y39.05595836950663 F300
G1 X50.09779583333334 Y39.06176041666667 F300
G1 X49.979659060153814 Y39.05739966223888 F300
G1 X49.86007172893557 Y39.04458614895939 F300
G1 X49.73938068313055 Y39.023680161135786 F300
G1 X49.61795742187501 Y38.99499446614584 F300
G1 X49.45915806325997 Y38.94634057762492 F300
G1 X49.303301846210836 Y38.88651099707093 F300
G1 X49.151513541666674 Y38.81655781250001 F300
G1 X49.00439381748326 Y38.73712431925196 F300
G1 X48.866122222748956 Y38.650937702913836 F300
G1 X48.73765559895834 Y38.55924225260418 F300
G1 X48.61548308237345 Y38.45925828937449 F300
G1 X48.508029007417086 Y38.35774185838534 F300
G1 X48.415575000000004 Y38.25583958333335 F300
G1 X48.5307114296565 Y38.20428114875158 F300
G1 X48.64569565179638 Y38.13928378390781 F300
G1 X48.76009717629507 Y38.06085277648368 F300
G1 X48.873337239583336 Y37.96889482421876 F300
G1 X48.97812426458619 Y37.86990993521666 F300
G1 X49.07889392369104 Y37.760450335143624 F300
G1 X49.17493347811053 Y37.64081273174561 F300
G1 X49.26541666666667 Y37.511269010416676 F300
G1 X49.34663283156459 Y37.37700402009077 F300
G1 X49.41984477086598 Y37.235959986465474 F300
G1 X49.48432026240227 Y37.088590642466386 F300
G1 X49.539227343750014 Y36.9353248372396 F300
G1 X49.58300827620161 Y36.77911127457351 F300
G1 X49.61527131659778 Y36.619820969852384 F300
G1 X49.63528843003654 Y36.45781220467281 F300
G1 X49.64218333333334 Y36.29342500000001 F300
G1 X49.6361390682138 Y36.146563113069114 F300
G1 X49.618622014998785 Y36.003467273180725 F300
G1 X49.59044529235713 Y35.86371252662528 F300
G1 X49.55228874952521 Y35.7268980077091 F300
G1 X49.504717592592606 Y35.5926515432099 F300
G1 X49.43335535543177 Y35.42925216759818 F300
G1 X49.34963268796785 Y35.26986199830675 F300
G1 X49.25459504188437 Y35.11419892891962 F300
G1 X49.1492351851852 Y34.962022067901245 F300
G1 X48.99722216096724 Y34.76762895434788 F300
G1 X48.83354076326984 Y34.58090626483142 F300
G1 X48.66110833333334 Y34.401654166666674 F300
G1 X48.45573441341734 Y34.20520135411405 F300
G1 X48.23960589254223 Y34.01454265167456 F300
G1 X48.01290397135418 Y33.82769850260417 F300
G1 X47.66147653806959 Y33.55617044149826 F300
G1 X47.28587031250001 Y33.28008541666668 F300
G1 X46.49305462239584 Y32.70627858072918 F300
G1 X46.22103077063804 Y32.503593004823344 F300
G1 X45.939119019170334 Y32.28693307611981 F300
G1 X45.647504166666664 Y32.05374166666668 F300
G1 X45.413839836873 Y31.854399504113214 F300
G1 X45.19356662821905 Y31.653104711925327 F300
G1 X44.98650719664137 Y31.449877854273932 F300
G1 X44.79249445444037 Y31.244719719018523 F300
G1 X44.611375079105514 Y31.037611496515826 F300
G1 X44.443013040123475 Y30.828515046296317 F300
G1 X44.302701610311296 Y30.63914775899123 F300
G1 X44.17272564666982 Y30.4484218696193 F300
G1 X44.05296681819168 Y30.256254713233442 F300
G1 X43.94333030020504 Y30.06254831094489 F300
G1 X43.843747419382474 Y29.867189939421092 F300
G1 X43.754178235827204 Y29.670052796554927 F300
G1 X43.674614043209885 Y29.470996759259272 F300
G1 X43.60407925991284 Y29.266728503812026 F300
G1 X43.54401186568364 Y29.060376672465914 F300
G1 X43.49447094676616 Y28.85171343049098 F300
G1 X43.45556768964066 Y28.64049728326999 F300
G1 X43.42746804252425 Y28.426474792154956 F300
G1 X43.41039510648057 Y28.209382340656557 F300
G1 X43.40463125 Y27.98894791666668 F300
G1 X43.410152623735705 Y27.774656533225084 F300
G1 X43.42653070919255 Y27.562508051641448 F300
G1 X43.453528823095766 Y27.352644526967328 F300
G1 X43.49096548591247 Y27.14520780918956 F300
G1 X43.53871259624877 Y26.94034604596229 F300
G1 X43.59669335000001 Y26.738220166666686 F300
G1 X43.664905631228116 Y26.53894093407095 F300
G1 X43.74284815074458 Y26.34395294154801 F300
G1 X43.830409761196954 Y26.15340779045802 F300
G1 X43.92752885893157 Y25.96747404687236 F300
G1 X44.034190960030514 Y25.786343601528124 F300
G1 X44.15042605 Y25.610237916666676 F300
G1 X44.27517414998366 Y25.440869674126873 F300
G1 X44.40872905555371 Y25.277884261722793 F300
G1 X44.55111393463573 Y25.12147054794143 F300
G1 X44.702397889391015 Y24.971855255394804 F300
G1 X44.86269262962723 Y24.82930951258551 F300
G1 X45.03214895 Y24.694155166666675 F300
G1 X45.20674133854793 Y24.569605263676994 F300
G1 X45.38960621547439 Y24.453393910976544 F300
G1 X45.5809355419247 Y24.345829353569222 F300
G1 X45.78095989002684 Y24.24728579136732 F300
G1 X45.98994389758267 Y24.158209726416164 F300
G1 X46.20818165000001 Y24.079125916666676 F300
G1 X46.3939697106871 Y24.022240547845495 F300
G1 X46.58585387140272 Y23.972955108456453 F300
G1 X46.78405488584975 Y23.931611773193282 F300
G1 X46.988806409879274 Y23.898602790196666 F300
G1 X47.20035257962605 Y23.874372851084814 F300
G1 X47.418945655312264 Y23.859421295098993 F300
G1 X47.64484375000001 Y23.854304166666676 F300
G1 X47.90244009205476 Y23.85998730637351 F300
G1 X48.14324849045611 Y23.87638529663059 F300
G1 X48.368282517491494 Y23.90259353676388 F300
G1 X48.57851572482534 Y23.937803849704515 F300
G1 X48.77487916666667 Y23.981304166666682 F300
G1 X48.9759227654938 Y24.03799926628768 F300
G1 X49.162233906643735 Y24.103245105032258 F300
G1 X49.334789872264096 Y24.176437476964324 F300
G1 X49.494496743226925 Y24.257091955858215 F300
G1 X49.64218333333334 Y24.34484166666668 F300
G1 X49.5121286255646 Y24.202971603241117 F300
G1 X49.37120651882523 Y24.067775848778748 F300
G1 X49.219503809668886 Y23.93911389056168 F300
G1 X49.05705830599843 Y23.816903804747003 F300
G1 X48.883870963541675 Y23.701122819010433 F300
G1 X48.707282210503266 Y23.595941624108377 F300
G1 X48.521687216846004 Y23.497301525600342 F300
G1 X48.327215084682024 Y23.405245312415417 F300
G1 X48.12399017321118 Y23.31985101271109 F300
G1 X47.9121390625 Y23.24123151041668 F300
G1 X47.70019643942004 Y23.172091034760147 F300
G1 X47.48168015657757 Y23.10983165871281 F300
G1 X47.25684691324256 Y23.05453315429541 F300
G1 X47.02596073818813 Y23.00629620814943 F300
G1 X46.78929700520834 Y22.965242154947926 F300
G1 X46.49411716371761 Y22.925200416167336 F300
G1 X46.19331671316453 Y22.896434118059897 F300
G1 X45.88759101432214 Y22.879059922306055 F300
G1 X45.577654166666676 Y22.873229166666675 F300
G1 X45.21905441669634 Y22.878057671444136 F300
G1 X44.88665574741471 Y22.89289847088881 F300
G1 X44.5772025716146 Y22.918179394531258 F300
G1 X44.34447552162158 Y22.946087202773338 F300
G1 X44.12120557237549 Y22.981306031389863 F300
G1 X43.90622271658023 Y23.0241355118438 F300
G1 X43.69841796875001 Y23.07487473958334 F300
G1 X43.492334376260274 Y23.13522821301202 F300
G1 X43.28989670773582 Y23.205124986258504 F300
G1 X43.0901166104315 Y23.285185974431958 F300
G1 X42.89201344401043 Y23.376082194010422 F300
G1 X42.699972726555444 Y23.475594798945824 F300
G1 X42.5060542721511 Y23.587761864797383 F300
G1 X42.30930060171565 Y23.713687192604567 F300
G1 X42.10870208333335 Y23.85456875000001 F300
G1 X41.97133057496019 Y23.964034615226055 F300
G1 X41.835648892326475 Y24.087822607751423 F300
G1 X41.70194860463781 Y24.2257034003509 F300
G1 X41.57060943333335 Y24.377442566666684 F300
G1 X41.448589588256986 Y24.534009204071126 F300
G1 X41.330852229139886 Y24.700702430858406 F300
G1 X41.21781912949828 Y24.876882415915915 F300
G1 X41.10996138333334 Y25.061885783333345 F300
G1 X41.01018913578659 Y25.250279059576908 F300
G1 X40.91729718249892 Y25.443720356665636 F300
G1 X40.83165493426287 Y25.641338259008357 F300
G1 X40.75365653333334 Y25.842264800000017 F300
G1 X40.68342510874195 Y26.04655646923507 F300
G1 X40.62236579090984 Y26.250341700615383 F300
G1 X40.57068227431749 Y26.452748665704235 F300
G1 X40.528593483333346 Y26.652946016666682 F300
G1 X40.495423179498985 Y26.85673178272475 F300
G1 X40.47323759437649 Y27.05427917078252 F300
G1 X40.46199089977792 Y27.244979763212303 F300
G1 X40.46167083333334 Y27.428295833333344 F300
G1 X40.20191722817205 Y27.279012955321676 F300
G1 X39.932108090852054 Y27.1314547982592 F300
G1 X39.65433888888891 Y26.985941898148166 F300
G1 X39.23425574105581 Y26.775505318444452 F300
G1 X38.81596250000001 Y26.57463240740742 F300
G1 X38.00898333333333 Y26.201952083333346 F300
G1 X37.804011236827485 Y26.097782024123834 F300
G1 X37.62351416351376 Y25.99570058169216 F300
G1 X37.46491982449163 Y25.895214672043018 F300
G1 X37.32587877604167 Y25.795895214843757 F300
G1 X37.21547094127286 Y25.706999434545136 F300
G1 X37.1169476148591 Y25.6176499636919 F300
G1 X37.02926862218603 Y25.527531169340957 F300
G1 X36.95149465117413 Y25.43631963467562 F300
G1 X36.88278437500001 Y25.343676822916674 F300
G1 X36.81983954123605 Y25.244911997388336 F300
G1 X36.764840847313195 Y25.142937129859288 F300
G1 X36.71734855212268 Y25.037248456051717 F300
G1 X36.67699637667343 Y24.927305973731364 F300
G1 X36.64348528645834 Y24.812529915364593 F300
G1 X36.612119093121194 Y24.668366132873267 F300
G1 X36.58971221266138 Y24.514069172761843 F300
G1 X36.57625634818126 Y24.348320077041716 F300
G1 X36.571766666666676 Y24.169687500000013 F300
G1 X36.578315995134396 Y23.9803646719345 F300
G1 X36.597034606196345 Y23.796965738601973 F300
G1 X36.62664011762938 Y23.619009263122074 F300
G1 X36.665983733333356 Y23.446037266666686 F300
G1 X36.7150453234961 Y23.274383232122776 F300
G1 X36.771922325131314 Y23.107668668742704 F300
G1 X36.83554052675902 Y22.94564654346203 F300
G1 X36.90487920000002 Y22.78808413333335 F300
G1 X37.00619613071484 Y22.58136420842231 F300
G1 X37.11300685992529 Y22.383487051160404 F300
G1 X37.22281946666668 Y22.19408820000001 F300
G1 X37.39299470233318 Y21.917230541690106 F300
G1 X37.55417093333335 Y21.66230956666668 F300
G1 X37.70752801213713 Y21.413915367453576 F300
G1 X37.833300000000015 Y21.191008333333343 F300
G1 X37.96059963072289 Y20.950504663879435 F300
G1 X38.071562310011075 Y20.718238301798312 F300
G1 X38.16787558880171 Y20.493311117189005 F300
G1 X38.251086882716066 Y20.27487384259261 F300
G1 X38.3263418255789 Y20.05022190997116 F300
G1 X38.390457057915825 Y19.82957981946351 F300
G1 X38.44460811063167 Y19.612246709078654 F300
G1 X38.489897839506185 Y19.397544907407422 F300
G1 X38.53920347852497 Y19.108065423396162 F300
G1 X38.576644479090696 Y18.81865545189015 F300
G1 X38.60429583333334 Y18.527977083333344 F300
G1 X38.634023458524524 Y18.279761247242597 F300
G1 X38.67244325942893 Y18.046687363305132 F300
G1 X38.71906261952059 Y17.82786399075946 F300
G1 X38.77344551707463 Y17.622441013372267 F300
G1 X38.83521464266735 Y17.429610965179577 F300
G1 X38.90405340572504 Y17.248610677585535 F300
G1 X38.97970774223484 Y17.078723233283423 F300
G1 X39.0619876291389 Y16.91928019342795 F300
G1 X39.15076820987656 Y16.76966404320989 F300
G1 X39.253177929421234 Y16.619435257231356 F300
G1 X39.3631022775937 Y16.479139390572243 F300
G1 X39.480624091920156 Y16.348285596406324 F300
G1 X39.60590061126776 Y16.226455529343916 F300
G1 X39.739161338204404 Y16.113305419166796 F300
G1 X39.88070522927002 Y16.008567597518862 F300
G1 X40.0308973021729 Y15.912051375841198 F300
G1 X40.1901647786252 Y15.823643206263696 F300
G1 X40.35899290123458 Y15.743306095679024 F300
G1 X40.544946305587196 Y15.66848762789386 F300
G1 X40.74248833861667 Y15.602521250177558 F300
G1 X40.95231880995554 Y15.545625908431273 F300
G1 X41.17518250353881 Y15.498095230355805 F300
G1 X41.41186492304875 Y15.46029331851853 F300
G1 X41.66318843999841 Y15.432650240103722 F300
G1 X41.93000887286243 Y15.415657341373622 F300
G1 X42.21321250000001 Y15.409862500000012 F300
G1 X42.51291248644483 Y15.411848354626136 F300
G1 X42.83124530000003 Y15.417687816666684 F300
G1 X43.47269690000002 Y15.43893703333335 F300
G1 X44.085484600000015 Y15.47027005000001 F300
G1 X44.617525700000016 Y15.50834676666668 F300
G1 X44.8466682034516 Y15.529879072604563 F300
G1 X45.01673750000001 Y15.549827083333344 F300
G1 X45.176554101562516 Y14.78818261718751 F300
G1 X45.25325278200378 Y14.395925638130489 F300
G1 X45.323323437500015 Y14.003668229166676 F300
G1 X45.38402512157052 Y13.61302716245955 F300
G1 X45.43070292968751 Y13.238898372395843 F300
G1 X45.45359792879593 Y12.990429712600566 F300
G1 X45.46760877886629 Y12.756025829279958 F300
G1 X45.47235000000001 Y12.536487500000009 F300
G1 X45.46884209839074 Y12.401353370060813 F300
G1 X45.459026995335954 Y12.28904049983263 F300
G1 X45.44390548148024 Y12.195788496954599 F300
G1 X45.424372222222246 Y12.118347839506184 F300
G1 X45.395267825117976 Y12.040399195155478 F300
G1 X45.36060112760941 Y11.976303782782622 F300
G1 X45.320602272771296 Y11.923396489273802 F300
G1 X45.27514722222224 Y11.87953688271606 F300
G1 X45.22324691843552 Y11.842759962601694 F300
G1 X45.163631887248236 Y11.811878127736847 F300
G1 X45.095218459384014 Y11.786295088513473 F300
G1 X45.01673750000001 Y11.76549166666668 F300
G1 X44.899999297842356 Y11.740879439885122 F300
G1 X44.732624609375016 Y11.714981054687513 F300
G1 X44.55225185830403 Y11.694288413025125 F300
G1 X44.34661406250001 Y11.677716145833347 F300
G1 X44.13682318927914 Y11.668123896157068 F300
G1 X43.92776210937501 Y11.666744205729179 F300
G1 X43.78868734315623 Y11.67139773556471 F300
G1 X43.66057976428712 Y11.680846632085483 F300
G1 X43.54512500000001 Y11.695112500000015 F300
G1 X43.48512358822681 Y11.706879471910478 F300
G1 X43.42658474155189 Y11.725105536864282 F300
G1 X43.36925067297539 Y11.750731202701314 F300
G1 X43.312928626543226 Y11.784923842592605 F300
G1 X43.26245702695007 Y11.824689426877054 F300
G1 X43.21208507210098 Y11.87472793469371 F300
G1 X43.16179164013111 Y11.937179124503277 F300
G1 X43.11171790123458 Y12.014611574074086 F300
G1 X43.070600303032975 Y12.092282702839123 F300
G1 X43.029582654473856 Y12.185579909731391 F300
G1 X42.98906114334509 Y12.297368891688889 F300
G1 X42.949547916666674 Y12.430918750000016 F300
G1 X42.91272622885648 Y12.568142614232999 F300
G1 X42.8674332030128 Y12.704502767398504 F300
G1 X42.81326632141149 Y12.839170621880031 F300
G1 X42.749754427083346 Y12.971276464843768 F300
G1 X42.67745213492173 Y13.098117272806084 F300
G1 X42.59577793900907 Y13.219448169787654 F300
G1 X42.50421451005206 Y13.334560655190435 F300
G1 X42.40212500000001 Y13.44265234375002 F300
G1 X42.3145828831175 Y13.521596900219201 F300
G1 X42.22017537454197 Y13.594870705265107 F300
G1 X42.11838490914263 Y13.66206854290528 F300
G1 X42.00861455521622 Y13.722678464586256 F300
G1 X41.89018932291668 Y13.77606455078127 F300
G1 X41.77130210294619 Y13.81865606059949 F300
G1 X41.64355800571936 Y13.853545863897674 F300
G1 X41.50602690392542 Y13.879886454970432 F300
G1 X41.357696833438425 Y13.89663328752042 F300
G1 X41.197477083333354 Y13.90253125000002 F300
G1 X41.054680842433854 Y13.897191602349162 F300
G1 X40.91539701586939 Y13.881534892775186 F300
G1 X40.77986908256893 Y13.856012636086131 F300
G1 X40.64833825004859 Y13.820958294420013 F300
G1 X40.52106565755211 Y13.776593717447938 F300
G1 X40.39665319735165 Y13.72221350152773 F300
G1 X40.278771676146285 Y13.659256284654932 F300
G1 X40.167608192726576 Y13.58795815787911 F300
G1 X40.06340190989455 Y13.508434827482844 F300
G1 X39.96647005208335 Y13.420691927083354 F300
G1 X39.87755404273645 Y13.325014329831218 F300
G1 X39.797636950709276 Y13.222074227020428 F300
G1 X39.72700988706891 Y13.111729285258086 F300
G1 X39.66612388076352 Y12.993720577387457 F300
G1 X39.6156201497396 Y12.86769208984377 F300
G1 X39.58349843393398 Y12.761714040371588 F300
G1 X39.559093130119685 Y12.650784533751823 F300
G1 X39.54288897547055 Y12.534568443491821 F300
G1 X39.53550808694051 Y12.412700435696927 F300
G1 X39.53771923033951 Y12.284795757708448 F300
G1 X39.55044583333334 Y12.15046041666669 F300
G1 X39.43932177112143 Y12.075000586230543 F300
G1 X39.34039389025376 Y11.994189244747844 F300
G1 X39.25269751296567 Y11.908768886453926 F300
G1 X39.175413657407425 Y11.819309876543233 F300
G1 X39.105336742190524 Y11.72240186584876 F300
G1 X39.04579043272206 Y11.62296982354413 F300
G1 X38.996157958447405 Y11.521509757675055 F300
G1 X38.9559564814815 Y11.418426929012368 F300
G1 X38.92419718282564 Y11.311535130378243 F300
G1 X38.90195943266173 Y11.20499003201196 F300
G1 X38.88882271521251 Y11.099190425817012 F300
G1 X38.88448958333335 Y10.994495833333357 F300
G1 X38.891312988570824 Y10.834925823314293 F300
G1 X38.91024228632062 Y10.686962048725658 F300
G1 X38.939245800788534 Y10.550385152072634 F300
G1 X38.976630729166686 Y10.42494713541669 F300
G1 X39.025800546735354 Y10.299496780214147 F300
G1 X39.08052900460742 Y10.189535186353588 F300
G1 X39.139088035651 Y10.094327670810038 F300
G1 X39.20013750000002 Y10.013156250000023 F300
G1 X39.15201663244197 Y9.894921574427352 F300
G1 X39.117146527777805 Y9.795296373456816 F300
G1 X39.0904988588385 Y9.697528419650483 F300
G1 X39.072784722222245 Y9.600602237654346 F300
G1 X39.0629522791846 Y9.500299547879315 F300
G1 X39.05964375000002 Y9.382389583333358 F300
G1 X39.06547307118948 Y9.250348501152747 F300
G1 X39.08235416591155 Y9.12412491030401 F300
G1 X39.10928734265856 Y9.003436999402695 F300
G1 X39.14546399432812 Y8.888027180806425 F300
G1 X39.190244563802096 Y8.777680240885429 F300
G1 X39.24444368797874 Y8.669872111243906 F300
G1 X39.305913929619756 Y8.568353912213999 F300
G1 X39.374011262444334 Y8.473040930880215 F300
G1 X39.44819115495793 Y8.383895458156596 F300
G1 X39.527989322916675 Y8.300938281250003 F300
G1 X39.636514459821 Y8.20488443048437 F300
G1 X39.75045340226344 Y8.120771171981875 F300
G1 X39.86877656607851 Y8.048559984159063 F300
G1 X39.99060087890626 Y7.988353743489583 F300
G1 X40.09289990666845 Y7.948006287846282 F300
G1 X40.194920817165695 Y7.916662778000205 F300
G1 X40.296285296339946 Y7.894221534342753 F300
G1 X40.39667442849387 Y7.880673671830951 F300
G1 X40.49580208333334 Y7.8761166666666655 F300

`;

//#endregion

// // Specify width only (maintains aspect ratio)
// const path1 = gcodeToPath(gcodeText, {
//   position: [0, 0, 1.0], // Center at origin, 1 unit above ground
//   width: 4, // 4 units wide
//   rotation: [0, 0, 0],
// });

// // Specify height only (maintains aspect ratio)
// const path2 = gcodeToPath(gcodeText, {
//   position: [5, 0, 1.0],
//   height: 1,
//   rotation: [0, 0, Math.PI / 4], // 45 degree rotation around Z axis
// });

// // Specify both width and height (stretches to fit)
// const path3 = gcodeToPath(gcodeText, {
//   position: [0, 5, 1.0],
//   width: 4,
//   height: 2,
//   drawSpeed: 1.0,
//   travelSpeed: 3.0,
// });

// Export for your specific case
// export const emildPath = gcodeToPath(gcodeText, {
//   position: [0, 1.0, 1.0],
//   width: 4,
//   penDownZ: 1.5,
//   penUpZ: 1,
// });

export let cvutPath = gcodeToPath(cvutGcode, {
  position: [1, 2.0, 3.0],
  width: 4,
  penDownZ: 3,
  penUpZ: 3,
});

export const gcodePath = [
  // Approach to start
  { pos: [0, 0, 2.5], rotEuler: [0, 0, 0], speed: 2.0 },

  // Letter E
  { pos: [13.97498, 19.67636, 2.5], rotEuler: [0, 0, 0], speed: 2.0 }, // approach
  { pos: [13.97498, 19.67636, 1.5], rotEuler: [0, 0, 0], speed: 1.0 }, // pen down
  { pos: [13.97498, 17.40521, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [2.568445, 17.40521, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [2.568445, 11.45922, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [13.2449, 11.45922, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [13.2449, 9.18807, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [2.568445, 9.18807, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [2.568445, 2.592906, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [14.4341, 2.592906, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [14.4341, 0.323643, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [0, 0.323643, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [0, 19.67636, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [13.97498, 19.67636, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [13.97498, 19.67636, 2.5], rotEuler: [0, 0, 0], speed: 1.0 }, // pen up

  // Letter M (complex shape)
  { pos: [36.29881, 13.49327, 2.5], rotEuler: [0, 0, 0], speed: 2.0 },
  { pos: [36.29881, 13.49327, 1.5], rotEuler: [0, 0, 0], speed: 1.0 },
  { pos: [36.92539, 12.58632, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [37.29984, 11.40088, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [37.42591, 9.938847, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [37.42591, 0.323643, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [35.04751, 0.323643, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [35.04751, 9.150437, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [35.02117, 10.01223, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [34.94402, 10.69527, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [34.81419, 11.20143, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [34.6185, 11.59281, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [34.33813, 11.92963, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [33.97309, 12.21187, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [33.54408, 12.4245, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [33.06802, 12.55057, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [32.54305, 12.59385, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [31.60975, 12.48471, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [30.78935, 12.15731, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [30.07997, 11.61163, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [29.53617, 10.8251, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [29.20877, 9.775145, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [29.09963, 8.463637, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [29.09963, 0.323643, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [26.72124, 0.323643, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [26.72124, 9.427039, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [26.65726, 10.39421, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [26.46345, 11.18638, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [26.14169, 11.80167, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [25.67316, 12.24198, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [25.03905, 12.50541, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [24.24311, 12.59385, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [23.59206, 12.53552, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [22.97488, 12.35864, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [22.38969, 12.06699, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [21.876, 11.66055, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [21.46392, 11.14498, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [21.15721, 10.52216, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [20.94459, 9.745037, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [20.81852, 8.768464, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [20.77524, 7.592436, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [20.77524, 0.323643, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [18.39684, 0.323643, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [18.39684, 14.3513, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [20.53251, 14.3513, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [20.53251, 12.36993, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [21.01985, 13.00969, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [21.60316, 13.56101, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [22.28432, 14.02202, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [23.04827, 14.37012, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [23.87807, 14.57898, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [24.77561, 14.6486, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [25.75031, 14.5771, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [26.60081, 14.36071, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [27.32713, 14.0032, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [27.92549, 13.51585, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [28.39214, 12.91373, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [28.73083, 12.1987, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [29.95578, 13.55913, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [31.40465, 14.37576, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [33.07743, 14.6486, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [34.36636, 14.52065, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [35.44078, 14.13491, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [36.29881, 13.49327, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [36.29881, 13.49327, 2.5], rotEuler: [0, 0, 0], speed: 1.0 },

  // Letter I (dot and line)
  { pos: [44.1923, 19.67636, 2.5], rotEuler: [0, 0, 0], speed: 2.0 },
  { pos: [44.1923, 19.67636, 1.5], rotEuler: [0, 0, 0], speed: 1.0 },
  { pos: [44.1923, 16.97243, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [41.8139, 16.97243, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [41.8139, 19.67636, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [44.1923, 19.67636, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [44.1923, 19.67636, 2.5], rotEuler: [0, 0, 0], speed: 1.0 },

  { pos: [44.1923, 14.3513, 2.5], rotEuler: [0, 0, 0], speed: 2.0 },
  { pos: [44.1923, 14.3513, 1.5], rotEuler: [0, 0, 0], speed: 1.0 },
  { pos: [44.1923, 0.323643, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [41.8139, 0.323643, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [41.8139, 14.3513, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [44.1923, 14.3513, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [44.1923, 14.3513, 2.5], rotEuler: [0, 0, 0], speed: 1.0 },

  // Letter L
  { pos: [50.37915, 19.67636, 2.5], rotEuler: [0, 0, 0], speed: 2.0 },
  { pos: [50.37915, 19.67636, 1.5], rotEuler: [0, 0, 0], speed: 1.0 },
  { pos: [50.37915, 0.323643, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [48.00076, 0.323643, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [48.00076, 19.67636, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [50.37915, 19.67636, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [50.37915, 19.67636, 2.5], rotEuler: [0, 0, 0], speed: 1.0 },

  // Letter D (complex curved shape)
  { pos: [74.05401, 15.78888, 2.5], rotEuler: [0, 0, 0], speed: 2.0 },
  { pos: [74.05401, 15.78888, 1.5], rotEuler: [0, 0, 0], speed: 1.0 },
  { pos: [73.24679, 16.51896, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [72.34547, 17.00818, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [71.52132, 17.22834, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [70.41679, 17.36193, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [69.03566, 17.40521, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [64.97507, 17.40521, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [64.97507, 2.592906, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [69.10152, 2.592906, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [70.28508, 2.632421, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [71.28423, 2.750964, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [72.10086, 2.950419, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [72.77825, 3.221376, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [73.35592, 3.556309, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [73.83573, 3.955217, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [74.39647, 4.632609, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [74.86876, 5.451125, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [75.25262, 6.408881, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [75.53486, 7.507762, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [75.70422, 8.753411, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [75.76066, 10.14395, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [75.64964, 12.01618, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [75.31847, 13.57418, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [74.76527, 14.81983, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [74.05401, 15.78888, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [74.05401, 15.78888, 2.5], rotEuler: [0, 0, 0], speed: 1.0 },

  { pos: [76.29504, 17.07028, 2.5], rotEuler: [0, 0, 0], speed: 2.0 },
  { pos: [76.29504, 17.07028, 1.5], rotEuler: [0, 0, 0], speed: 1.0 },
  { pos: [77.05711, 15.96764, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [77.64983, 14.70505, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [78.07132, 13.29946, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [78.32534, 11.76592, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [78.40813, 10.10443, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [78.35168, 8.691317, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [78.18046, 7.387337, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [77.89445, 6.196256, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [77.51812, 5.127481, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [77.07781, 4.186659, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [76.57353, 3.379434, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [76.02033, 2.686989, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [75.43326, 2.101797, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [74.81043, 1.623859, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [74.12927, 1.230596, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [73.35969, 0.906953, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [72.50166, 0.652931, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [71.55331, 0.46853, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [70.5184, 0.359394, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [69.3913, 0.323643, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [62.4085, 0.323643, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [62.4085, 19.67636, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [69.07518, 19.67636, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [70.46195, 19.64437, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [71.60976, 19.55217, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [72.52047, 19.39787, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [73.57607, 19.07423, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [74.52254, 18.61135, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [75.35987, 18.01298, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [76.29504, 17.07028, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [76.29504, 17.07028, 2.5], rotEuler: [0, 0, 0], speed: 1.0 },

  // Letter S (complex curved shape)
  { pos: [102.8676, 18.09201, 2.5], rotEuler: [0, 0, 0], speed: 2.0 },
  { pos: [102.8676, 18.09201, 1.5], rotEuler: [0, 0, 0], speed: 1.0 },
  { pos: [103.5413, 17.26597, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [104.0399, 16.32891, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [104.3579, 15.31094, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [104.4915, 14.21583, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [102.0322, 14.02578, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [101.7951, 15.14724, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [101.3491, 16.07113, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [100.6925, 16.79368, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [99.80996, 17.31301, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [98.68473, 17.62536, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [97.31866, 17.72886, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [95.90931, 17.63477, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [94.78032, 17.35065, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [93.9317, 16.87835, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [93.34275, 16.27058, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [92.98712, 15.58754, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [92.86858, 14.82548, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [92.95325, 14.17067, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [93.20351, 13.59865, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [93.62123, 13.10942, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [94.37953, 12.65594, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [95.66658, 12.19682, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [97.48425, 11.72829, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [99.34708, 11.27858, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [100.7752, 10.8665, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [101.765, 10.49581, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [102.7924, 9.931319, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [103.6222, 9.274626, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [104.2563, 8.527613, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [104.7022, 7.692163, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [104.9694, 6.775802, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [105.0598, 5.780412, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [104.9619, 4.773732, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [104.6665, 3.804686, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [104.1773, 2.877035, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [103.5017, 2.034058, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [102.6569, 1.328441, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [101.6389, 0.756421, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [100.4911, 0.334933, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [99.24923, 0.084674, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [97.91703, 0, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [96.26306, 0.084674, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [94.79726, 0.338696, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [93.52151, 0.763948, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [92.42451, 1.358547, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [91.49873, 2.126258, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [90.74043, 3.065199, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [90.17594, 4.133973, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [89.8222, 5.291184, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [89.67918, 6.538715, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [92.08581, 6.755104, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [92.2514, 5.840624, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [92.51671, 5.040926, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [92.88362, 4.35977, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [93.3785, 3.776461, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [94.02766, 3.270298, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [94.82925, 2.846929, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [95.74561, 2.525167, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [96.73535, 2.333239, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [97.79848, 2.269264, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [98.73554, 2.318186, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [99.59734, 2.463073, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [100.3839, 2.707687, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [101.0669, 3.035093, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [101.6239, 3.435883, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [102.0529, 3.908176, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [102.3558, 4.431273, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [102.5383, 4.984477, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [102.6004, 5.565905, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [102.5421, 6.145451, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [102.3652, 6.672311, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [102.0717, 7.150249, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [101.6427, 7.577383, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [101.0631, 7.957475, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [100.3293, 8.288645, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [99.59922, 8.529495, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [98.45142, 8.84373, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [96.884, 9.233231, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [95.28272, 9.652837, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [94.03896, 10.05551, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [93.14893, 10.44125, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [92.30596, 10.96622, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [91.61916, 11.56835, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [91.08854, 12.24763, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [90.71221, 12.99276, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [90.48454, 13.7981, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [90.40926, 14.65989, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [90.50146, 15.61577, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [90.77995, 16.53025, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [91.24095, 17.40145, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [91.88071, 18.18421, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [92.68982, 18.82962, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [93.67015, 19.33954, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [94.77468, 19.70646, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [95.95824, 19.92662, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [97.22082, 20, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [98.59819, 19.92285, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [99.86265, 19.69141, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [101.0142, 19.30756, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [102.0247, 18.77129, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [102.8676, 18.09201, 1.5], rotEuler: [0, 0, 0], speed: 1.5 },
  { pos: [102.8676, 18.09201, 2.5], rotEuler: [0, 0, 0], speed: 1.0 },

  // Return to home
  { pos: [0, 0, 2.5], rotEuler: [0, 0, 0], speed: 2.0 },
];
