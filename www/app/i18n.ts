// Copyright 2018 The Outline Authors
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import * as errors from '../model/errors';

export type LocalizationFunction = (...args: string[]) => string;

export function getLocalizedErrorMessage(e: Error = new Error(), localize?: LocalizationFunction) {
  if (!localize) {
    console.error('Localization function not available');
    return 'An unexpected error occurred. Please submit feedback.';
  }
  let messageLocalizationKey: string;
  if (e instanceof errors.UnexpectedPluginError) {
    messageLocalizationKey = 'outline-plugin-error-unexpected';
  } else if (e instanceof errors.VpnPermissionNotGranted) {
    messageLocalizationKey = 'outline-plugin-error-vpn-permission-not-granted';
  } else if (e instanceof errors.InvalidServerCredentials) {
    messageLocalizationKey = 'outline-plugin-error-invalid-server-credentials';
  } else if (e instanceof errors.RemoteUdpForwardingDisabled) {
    messageLocalizationKey = 'outline-plugin-error-udp-forwarding-not-enabled';
  } else if (e instanceof errors.ServerUnreachable) {
    messageLocalizationKey = 'outline-plugin-error-server-unreachable';
  } else if (e instanceof errors.OutlinePluginError) {
    messageLocalizationKey = 'outline-plugin-error-networking-error';
  } else if (e instanceof errors.FeedbackSubmissionError) {
    messageLocalizationKey = 'error-feedback-submission';
  } else if (e instanceof errors.ServerUrlInvalid) {
    messageLocalizationKey = 'error-invalid-access-key';
  } else if (e instanceof errors.ServerIncompatible) {
    messageLocalizationKey = 'error-server-incompatible';
  } else if (e instanceof errors.OperationTimedOut) {
    messageLocalizationKey = 'error-timeout';
  } else if (e instanceof errors.ServerAlreadyAdded) {
    // Handle differently due to the use of localization parameters.
    return localize('error-server-already-added', 'serverName', e.server.name);
  } else {
    messageLocalizationKey = 'error-unexpected';
  }
  return localize(messageLocalizationKey);
}
