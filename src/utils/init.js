import loader from './loader';
import logger from './logger';
/**
 * Configuration
 */
const config = {
  debug: false,
  isNotBrowser(){
    return typeof window === 'undefined' || typeof document === 'undefined';
  } 
};

function startdeliver(...args) {
  if (!window.startdeliver) {
    return logger('Allow loading Startdeliver first or script should be loaded manually');
  }

  return window.startdeliver(...args);
}

/**
 * Initialize the Startdeliver script
 * @param {string} usageId - Startdeliver UsageID
 * @param {Object} options - Options object
 * @param {number} [options.debug] - Boolean flag for switching debug mode. Default to false
 * @param {string} [options.skipLoader] - Boolean flag to disable option of loading script. Default to false
 */
function init(usageId, options) {
  if (!(typeof usageId === 'string')) {
    logger('USAGE_ID is required to initialize Startdeliver');
    return null;
  }

  if (config.isNotBrowser()) {
    return null;
  }

  if (!options || options.skipLoader !== true) {
    loader();
  }

  if (options && options.debug) {
    config.debug = !!options.debug;

    startdeliver('setDebug', config.debug);
  }

  startdeliver('initialize', usageId);
}

/**
 *
 * @param {Object} payload
 * @param {String} payload.userId - User email or value for the field if startdeliverUserFieldToMatchOn provided
 * @param {String} payload.usageType - Type of the event
 * @param {String} [payload.startdeliverUserFieldToMatchOn] - Field name to find a specific user. Default to 'email'
 * @param {Number} [payload.timestamp] - Custom timestamp in milliseconds of the event. Detault to current time
 *
 */
function send(payload) {
  startdeliver('sendEvent', payload);
}

export { init, send };
