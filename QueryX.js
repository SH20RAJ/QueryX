var queryX = function (selector, context) {
    return new QueryX(selector, context);
};

function QueryX(selector, context) {
    if (!(this instanceof QueryX)) {
        return new QueryX(selector, context);
    }

    if (typeof selector === 'string') {
        this.nodes = Array.from((context || document).querySelectorAll(selector));
    } else if (selector && selector.nodeName) {
        this.nodes = [selector];
    } else if (selector instanceof QueryX) {
        this.nodes = selector.nodes;
    } else {
        this.nodes = [];
    }
}

QueryX.prototype = {
    get length() {
        return this.nodes.length;
    },
    nodes: [],
    addClass: function () {
        return this.eacharg(arguments, function (node, className) {
            node.classList.add(className);
        });
    },
    adjacent: function (content, target, callback) {
        var targets = typeof target === 'number' ? Array.from({ length: target }) : Array.from(target || []);

        this.each(function (node, index) {
            var fragment = document.createDocumentFragment();

            targets.map(function (target) {
                var processedContent = typeof content === 'function' ? content.call(this, target, index, node) : content;
                var newNode = typeof processedContent === 'string' ? queryX.generate(processedContent) : processedContent;
                return newNode instanceof QueryX ? newNode.nodes : newNode;
            }).forEach(function (element) {
                if (queryX.isInPage(element)) {
                    fragment.appendChild(queryX(element).clone().first());
                } else {
                    fragment.appendChild(element);
                }
            });

            callback.call(this, node, fragment);
        });

        return this;
    },
    after: function (content) {
        return this.adjacent(content, 1, function (node, fragment) {
            node.parentNode.insertBefore(fragment, node.nextSibling);
        });
    },
    append: function (content) {
        return this.adjacent(content, null, function (node, fragment) {
            node.appendChild(fragment);
        });
    },
    args: function (args, element, index) {
        return (typeof args === 'function' ? args(element, index) : args)
            .toString()
            .split(/[\s,]+/)
            .filter(function (arg) {
                return arg.length;
            });
    },
    array: function (callback) {
        var self = this;
        return this.nodes.reduce(function (acc, node, index) {
            var result = callback.call(self, node, index);
            return acc.concat(result !== false ? result : []);
        }, []);
    },
    attr: function (name, value, dataPrefix) {
        dataPrefix = dataPrefix ? 'data-' : '';
        if (value === undefined) {
            return this.nodes.length ? this.nodes[0].getAttribute(dataPrefix + name) : undefined;
        } else {
            this.each(function (node) {
                if (value === null) {
                    node.removeAttribute(dataPrefix + name);
                } else {
                    node.setAttribute(dataPrefix + name, value);
                }
            });
            return this;
        }
    },
    before: function (content) {
        return this.adjacent(content, 1, function (node, fragment) {
            node.parentNode.insertBefore(fragment, node);
        });
    },
    children: function (selector) {
        return queryX(this.map(function (node) {
            return Array.from(node.children).filter(function (child) {
                return !selector || child.matches(selector);
            });
        }).array());
    },
    clone: function () {
        return queryX(this.map(function (node) {
            var clonedNode = node.cloneNode(true);
            return queryX(clonedNode);
        }).array());
    },
    closest: function (selector) {
        return queryX(this.map(function (node) {
            var current = node;
            while (current && current !== document) {
                if (current.matches(selector)) {
                    return current;
                }
                current = current.parentNode;
            }
            return null;
        }).array());
    },
    data: function (key, value) {
        return this.attr(key, value, true);
    },
    each: function (callback) {
        this.nodes.forEach(callback, this);
        return this;
    },
    eacharg: function (args, callback) {
        return this.each(function (node, index) {
            queryX.args(args, node, index).forEach(function (arg) {
                callback.call(this, node, arg);
            }, this);
        });
    },
    empty: function () {
        return this.each(function (node) {
            while (node.firstChild) {
                node.removeChild(node.firstChild);
            }
        });
    },
    filter: function (selector) {
        var self = this;
        var filterFn = typeof selector === 'function' ?
            selector :
            function (node) {
                return node.matches(selector);
            };

        return queryX(this.nodes.filter(filterFn).map(function (node) {
            return node;
        }));
    },
    find: function (selector) {
        return queryX(this.map(function (node) {
            return node.querySelectorAll(selector);
        }).array());
    },
    first: function () {
        return this.nodes[0] || null;
    },
    generate: function (html) {
        var template = document.createElement('template');
        template.innerHTML = html.trim();
        return queryX(template.content.childNodes);
    },
    hasClass: function (className) {
        return this.nodes.some(function (node) {
            return node.classList.contains(className);
        });
    },
    html: function (htmlString) {
        if (htmlString === undefined) {
            return this.nodes.length ? this.nodes[0].innerHTML : '';
        } else {
            this.each(function (node) {
                node.innerHTML = htmlString;
            });
            return this;
        }
    },
    isInPage: function (node) {
        return node !== document.body && document.body.contains(node);
    },
    last: function () {
        return this.nodes[this.nodes.length - 1] || null;
    },
    map: function (callback) {
        return queryX(this.array(callback));
    },
    not: function (selector) {
        var self = this;
        var filterFn = typeof selector === 'function' ?
            selector :
            function (node) {
                return !queryX(node).is(selector);
            };

        return queryX(this.nodes.filter(filterFn));
    },
    off: function (event, handler) {
        this.each(function (node) {
            node.removeEventListener(event, handler);
        });
        return this;
    },
    on: function (event, selector, handler) {
        this.each(function (node) {
            node.addEventListener(event, function (e) {
                if (e.target.matches(selector)) {
                    handler.call(e.target, e);
                }
            });
        });
        return this;
    },
    parent: function (selector) {
        return queryX(this.map(function (node) {
            return node.parentNode;
        }).filter(selector).array());
    },
    prepend: function (content) {
        return this.adjacent(content, 1, function (node, fragment) {
            node.insertBefore(fragment, node.firstChild);
        });
    },
    remove: function () {
        this.each(function (node) {
            if (node.parentNode) {
                node.parentNode.removeChild(node);
            }
        });
        return this;
    },
    removeClass: function () {
        return this.eacharg(arguments, function (node, className) {
            node.classList.remove(className);
        });
    },
    replace: function (content) {
        var removed = [];
        this.adjacent(content, 1, function (node, fragment) {
            removed = removed.concat(Array.from(node.children));
            node.parentNode.replaceChild(fragment, node);
        });
        return queryX(removed);
    },
    scroll: function () {
        var firstNode = this.first();
        if (firstNode) {
            firstNode.scrollIntoView({ behavior: 'smooth' });
        }
        return this;
    },
    serialize: function () {
        var self = this;
        return this.map(function (form) {
            return Array.from(form.elements).filter(function (element) {
                return element.name && !element.disabled &&
                    ['file', 'submit', 'reset', 'button'].indexOf(element.type) === -1 &&
                    !element.matches(':disabled');
            }).map(function (element) {
                if (element.type === 'select-multiple') {
                    return Array.from(element.selectedOptions).map(function (option) {
                        return encodeURIComponent(element.name) + '=' + encodeURIComponent(option.value);
                    }).join('&');
                } else {
                    return encodeURIComponent(element.name) + '=' + encodeURIComponent(element.value);
                }
            }).join('&');
        }).array().join('&');
    },
    siblings: function (selector) {
        return this.parent().children(selector).not(this);
    },
    size: function () {
        var rect = this.first().getBoundingClientRect();
        return rect ? { width: rect.width, height: rect.height } : null;
    },
    slice: function (arrayLike) {
        return Array.prototype.slice.call(arrayLike || this.nodes || []);
    },
    str: function (element, index) {
        return function (value) {
            return typeof value === 'function' ? value.call(this, element, index) : value.toString();
        };
    },
    text: function (text) {
        if (text === undefined) {
            return this.nodes.length ? this.nodes[0].textContent : '';
        } else {
            this.each(function (node) {
                node.textContent = text;
            });
            return this;
        }
    },
    toggleClass: function (className, state) {
        if (state !== undefined) {
            return this[state ? 'addClass' : 'removeClass'](className);
        } else {
            return this.eacharg(className, function (node, className) {
                node.classList.toggle(className);
            });
        }
    },
    trigger: function (event, detail) {
        var customEvent;
        if (typeof CustomEvent === 'function') {
            customEvent = new CustomEvent(event, { bubbles: true, cancelable: true, detail: detail });
        } else {
            customEvent = document.createEvent('CustomEvent');
            customEvent.initCustomEvent(event, true, true, detail);
        }

        return this.each(function (node) {
            node.dispatchEvent(customEvent);
        });
    },
    unique: function () {
        var uniqueNodes = this.nodes.reduce(function (acc, node) {
            if (acc.indexOf(node) === -1) {
                acc.push(node);
            }
            return acc;
        }, []);

        return queryX(uniqueNodes);
    },
    uri: function (string) {
        return encodeURIComponent(string)
            .replace(/!/g, '%21')
            .replace(/'/g, '%27')
            .replace(/\(/g, '%28')
            .replace(/\)/g, '%29')
            .replace(/\*/g, '%2A')
            .replace(/%20/g, '+');
    },
    wrap: function (wrapper) {
        var wrapperNode = typeof wrapper === 'string' ? queryX.generate(wrapper).first() : wrapper;
        this.each(function (node) {
            var parent = node.parentNode;
            if (parent) {
                parent.insertBefore(wrapperNode, node);
                wrapperNode.appendChild(node);
            }
        });
        return this;
    }
};

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = queryX;
}
