/*
 * This file is part of the Sulu CMS.
 *
 * (c) MASSIVE ART WebServices GmbH
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

define([
    'services/sulucontact/contact-manager',
    'services/sulucontact/contact-router'
], function(ContactManager, ContactRouter) {

    'use strict';

    var constants = {
            datagridInstanceName: 'contacts',
            listViewStorageKey: 'contactListView'
        },

        bindCustomEvents = function() {
            // delete clicked
            this.sandbox.on('sulu.toolbar.delete', function() {
                this.sandbox.emit('husky.datagrid.' + constants.datagridInstanceName + '.items.get-selected',
                    deleteCallback.bind(this));
            }, this);

            // remove from datagrid when deleted
            this.sandbox.on('sulu.contacts.contact.deleted', function(contactId) {
                this.sandbox.emit('husky.datagrid.' + constants.datagridInstanceName + '.record.remove', contactId);
            }, this);

            // add clicked
            this.sandbox.on('sulu.toolbar.add', function() {
                ContactRouter.toAdd();
            }, this);

            // checkbox clicked
            this.sandbox.on('husky.datagrid.' + constants.datagridInstanceName + '.number.selections', function(number) {
                var postfix = number > 0 ? 'enable' : 'disable';
                this.sandbox.emit('sulu.header.toolbar.item.' + postfix, 'deleteSelected', false);
            }, this);

            this.sandbox.on('sulu.toolbar.change.table', function() {
                this.sandbox.emit('husky.datagrid.' + constants.datagridInstanceName + '.view.change', 'table');
                this.sandbox.sulu.saveUserSetting(constants.listViewStorageKey, 'table');
            }.bind(this));

            this.sandbox.on('sulu.toolbar.change.cards', function() {
                this.sandbox.emit(
                    'husky.datagrid.' + constants.datagridInstanceName + '.view.change', 'datagrid/decorators/card-view'
                );
                this.sandbox.sulu.saveUserSetting(constants.listViewStorageKey, 'datagrid/decorators/card-view');
            }.bind(this));
        },

        deleteCallback = function(ids) {
            this.sandbox.sulu.showDeleteDialog(function(confirmed) {
                if (!!confirmed) {
                    ContactManager.delete(ids);
                }
            }.bind(this));
        },

        actionCallback = function(id) {
            ContactRouter.toEdit(id);
        };

    return {

        layout: {
            content: {
                width: 'max'
            }
        },

        header: {
            noBack: true,
            title: 'contact.contacts.title',

            toolbar: {
                buttons: {
                    add: {},
                    deleteSelected: {}
                }
            }
        },

        templates: ['/admin/contact/template/contact/list'],

        initialize: function() {
            this.render();
            bindCustomEvents.call(this);
        },

        /**
         * @returns {Object} the list-toolbars config object
         */
        getListToolbarConfig: function() {
            return {
                el: this.$find('#list-toolbar-container'),
                instanceName: 'contacts',
                template: this.sandbox.sulu.buttons.get({
                    contactDecoratorDropdown: {},
                    settings: {
                        options: {
                            dropdownItems: [
                                {
                                    type: 'columnOptions'
                                }
                            ]
                        }
                    }
                })
            };
        },

        /**
         * @returns {Object} the datagrids config object
         */
        getDatagridConfig: function() {
            return {
                el: this.sandbox.dom.find('#people-list', this.$el),
                url: '/admin/api/contacts?flat=true',
                searchInstanceName: 'contacts',
                searchFields: ['fullName'],
                resultKey: 'contacts',
                instanceName: constants.datagridInstanceName,
                actionCallback: actionCallback.bind(this),
                view: this.sandbox.sulu.getUserSetting(constants.listViewStorageKey) || 'datagrid/decorators/card-view',
                viewOptions: {
                    table: {
                        actionIconColumn: 'firstName',
                        noImgIcon: 'fa-user'
                    },
                    'datagrid/decorators/card-view': {
                        fields: {
                            picture: 'avatar',
                            title: ['firstName', 'lastName']
                        },
                        icons: {
                            picture: 'fa-user'
                        }
                    }
                }
            };
        },

        render: function() {
            this.sandbox.dom.html(this.$el, this.renderTemplate('/admin/contact/template/contact/list'));

            // init list-toolbar and datagrid
            this.sandbox.sulu.initListToolbarAndList.call(this, 'contacts', '/admin/api/contacts/fields',
                this.getListToolbarConfig(),
                this.getDatagridConfig(),
                'contacts',
                '#people-list-info'
            );
        }
    };
});
